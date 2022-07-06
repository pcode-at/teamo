import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchDto } from "./dto/search.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaClient, users } from "@prisma/client";
import { SkillDto } from "./dto/skill.dto";
import { searchForUsers } from "src/algorithms/search.algorithm";
import { UserAndSkills } from "src/types/userAndSkills.type";
import { UserResponse, UserResponses } from "src/entities/user-response.entity";
import { UserEntity } from "src/entities/user.entity";
import { log } from "console";
import { Authorization } from "src/auth/entities/authorization.entity";

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await prisma.users.create({
      data: {
        ...createUserDto,
        birthDate: new Date(createUserDto.birthDate.toString()),
        authorization: {
          accessTokens: [],
          refreshTokens: [],
        },
      },
    });
    return new UserResponse({ statusCode: 201, message: "User created successfully", data: new UserEntity(user) });
  }

  async findAll(): Promise<UserResponses> {
    const users = await prisma.users.findMany();
    return new UserResponses({ statusCode: 200, message: "Users found successfully", data: users.map(user => new UserEntity(user)) });
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

  async updateOne(identifier: string, user: UserEntity): Promise<UserResponse> {
    const { id, ...rest } = user;
    // console.log(rest.authorization);

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
  }

  async updateAuthorization(identifier: string, authorization: Authorization) {
    const user = await this.findOne(identifier);  

    user.data.authorization.accessTokens.push(authorization.data?.accessToken);
    user.data.authorization.refreshTokens.push(authorization.data?.refreshToken);

    await this.updateOne(identifier, user.data);
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
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
            hasEvery: department,
          },
          birthDate: {
            gte: new Date(new Date().getFullYear() - minAge),
            lte: new Date(new Date().getFullYear() - maxAge),
          },
          gender,
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
