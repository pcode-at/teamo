import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchDto } from "./dto/search.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponse } from "src/entities/user-response.entity";
import { UserEntity } from "src/entities/user.entity";
import { PrismaClient } from "@prisma/client";
import { SkillDto } from "./dto/skill.dto";
import { searchForUsers } from "src/algorithms/search.algorithm";
import { UserAndSkills } from "src/types/userAndSkills.type";
import { recommendUsers } from "src/algorithms/recommend.algorithm";
import { Authorization } from "src/auth/entities/authorization.entity";
import { JwtService } from "@nestjs/jwt";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');


const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    let password = createUserDto.password
    let hashed = await bcrypt.hash(password, 10);

    const user = await prisma.users.create({
      data: {
        ...createUserDto,
        password: hashed,
        birthDate: new Date(createUserDto.birthDate.toString()),
        authorization: {
          accessTokens: [],
          refreshTokens: [],
        },
      },
    });
    return new UserResponse({ statusCode: 201, message: "User created successfully", data: new UserEntity(user) });
  }

  async findAll(): Promise<UserResponse> {
    const users = await prisma.users.findMany();
    return new UserResponse({ statusCode: 200, message: "Users found successfully", data: users.map(user => new UserEntity(user)) });
  }

  async findOne(identifier: string): Promise<UserResponse> {
    const user = await prisma.users.findUnique({
      where: {
        identifier,
      },
    });
    if (user) {
      return new UserResponse({ statusCode: 200, message: "User found successfully", data: new UserEntity(user) });
    }
    return new UserResponse({ statusCode: 404, message: "User not found" });
  }
  async recommend(projectId: string, stage: number, numberOfRecommendations: number): Promise<UserAndSkills[]> {
    const recommendedUsers = recommendUsers(projectId, stage, numberOfRecommendations);
    return null;
  }

  async findOneDetailed(jwt: string): Promise<UserResponse> {
    const decoded = await this.jwtService.decode(jwt);
    const identifier = decoded.identifier;
    
    const user = await prisma.users.findUnique({
      where: {
        identifier,
      },
      include: {
        skills: {
          include: {
            skill: true,
          },
        },
      },
    });
    if (user) {
      return new UserResponse({ statusCode: 200, message: "User found successfully", data: new UserEntity(user) });
    }
    return new UserResponse({ statusCode: 404, message: "User not found" });
  }

  async updateOne(identifier: string, user: UserEntity): Promise<UserResponse> {
    const { id, ...rest } = user;

    const updatedUser = await prisma.users.update({
      where: {
        identifier,
      },
      data: {
        ...rest,
        birthDate: new Date(user.birthDate.toString()),
      },
    });
    return new UserResponse({ statusCode: 200, message: "User updated successfully", data: new UserEntity(updatedUser) });

    //return this.userModel.findOne({ identifier }).populate("skill").exec();
  }

  async updateAuthorization(identifier: string, authorization: Authorization) {
    const user = await (await this.findOne(identifier)).data as UserEntity;

    if (authorization.accessToken) user.authorization.accessTokens.push(authorization.accessToken);
    if (authorization.refreshToken) user.authorization.refreshTokens.push(authorization.refreshToken);

    await this.updateOne(identifier, user);
  }

  async addSkill(skill: SkillDto) {
    await prisma.userSkills.create({
      data: {
        user: {
          connect: {
            identifier: skill.identifier,
          },
        },
        skill: {
          connect: {
            id: skill.skill,
          },
        },
        rating: skill.rating,
      },
    });
  }

  async getSkillsForUser(identifier: string) {
    return await prisma.userSkills.findMany({
      where: {
        user: {
          identifier,
        },
      },
      include: {
        skill: true,
      },
    });
  }

  async getSkills(skillId) {
    return await prisma.userSkills.findMany({
      where: {
        id: skillId,
      },
      include: {
        user: true,
        skill: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponse> {
    let user;
    try {
      user = await prisma.users.update({
        where: {
          identifier: id,
        },
        data: {
          ...updateUserDto,
          birthDate: new Date(updateUserDto.birthDate.toString()),
        },
      })
    } catch {
      throw new BadRequestException("Something went wrong while updating the user");
    }
    return new UserResponse({ statusCode: 200, message: "User updated successfully", data: new UserEntity(user) });

  }

  async remove(id: string): Promise<UserResponse> {
    try {
      await prisma.users.delete({
        where: {
          identifier: id,
        },
      });
    } catch {
      throw new BadRequestException("Something went wrong while deleting the user");
    }
    return new UserResponse({ statusCode: 200, message: "User deleted successfully" });

  }

  async search(search: SearchDto): Promise<UserAndSkills[]> {
    const attributes = search.parameters.filter(search => search.required).map(search => search.attribute);
    const required = search.parameters.filter(search => search.required).map(search => search.value);

    let location,
      department,
      maxAge,
      minAge,
      gender = undefined;

    if (attributes.includes("location")) location = search.parameters.find(search => search.attribute === "location").value;
    if (attributes.includes("department")) department = search.parameters.find(search => search.attribute === "department").value;
    if (attributes.includes("maxAge")) maxAge = search.parameters.find(search => search.attribute === "maxAge").value;
    if (attributes.includes("minAge")) minAge = search.parameters.find(search => search.attribute === "minAge").value;
    if (attributes.includes("gender")) gender = search.parameters.find(search => search.attribute === "gender").value;

    const skills = prisma.userSkills.findMany({
      where: {
        user: {
          location,
          departments: {
            hasSome: department,
          },
        },

        skill: {
          name: {
            in: required,
          },
        },
      },
      include: {
        skill: true,
        user: true,
      },
    });

    let findResult = searchForUsers(await skills, search);

    return findResult;

    //throw new BadRequestException('Location is required');
  }

  // async recommend(projectId: string): Promise<UserAndSkills[]> {
  //   const existingMember = await prisma.project.findOne({
  //     where: {
  //       id: projectId,
  //     },
  //     include: {
  //       members: true,
  //     },
  //   });

  //   const users = await prisma.userSkills.findMany({
  //     include: {
  //       skill: true,
  //       user: true,
  //     },
  //   });

  //   const recommendedUsers = recommendUsers(users);
  //   return null;
  // }
}
