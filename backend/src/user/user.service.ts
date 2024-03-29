import { BadRequestException, CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cache } from "cache-manager";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserResponse } from "src/entities/user-response.entity";
import { UserEntity } from "src/entities/user.entity";
import { PrismaClient } from "@prisma/client";
import { SkillDto } from "./dto/skill.dto";
import { UserAndSkills } from "src/types/userAndSkills.type";
import { recommendUsers } from "src/algorithms/recommend.algorithm";
import { JwtService } from "@nestjs/jwt";
import { LocationEntity, LocationResponse } from "src/entities/location.entity";
import { ElasticService } from "src/elastic/elastic.service";
import { SkillEntity, SkillResponse } from "src/entities/skill.entity";
import { AuthorizationEntity } from "src/auth/entities/authorization.entity";
import { SearchDto } from "./dto/search.dto";
import { ProjectEntity } from "src/entities/project.entity";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private readonly elastic: ElasticService,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    let password = createUserDto.password;
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
        defaultWorkHours: 38.5,
        workHourChanges: [],
      },
    });
    return new UserResponse({ statusCode: 201, message: "User created successfully", data: new UserEntity(user) });
  }



  async getBookmarksForUser(identifier: string, request): Promise<any> {
    const userId = await (await prisma.users.findUnique({ where: { identifier }, select: { id: true } })).id;

    const projects = await prisma.projects.findMany();

    let bookmarks = [];

    projects.forEach((project) => {
      if (project.bookmarkIds.includes(userId)) {
        bookmarks.push({
          projectId: project.id,
          projectName: project.name,
        });
      }
    });

    return {
      statusCode: 200,
      message: "Successfully fetched bookmarks",
      data: bookmarks,
    };
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

  async getUserByIdentifier(identifier: string): Promise<UserResponse> {
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
    throw new BadRequestException("User not found");
  }

  async recommend(projectId: string, stage: number, numberOfRecommendations: number): Promise<UserAndSkills[]> {
    const recommendedUsers = recommendUsers(projectId, stage, numberOfRecommendations);
    return null;
  }

  async getBookmarks(jwt): Promise<UserResponse> {
    const decoded = await this.jwtService.decode(jwt);
    //@ts-ignore
    const identifier = decoded.identifier;
    const projects = await prisma.projects.findMany({
      where: {
        creator: {
          identifier,
        },
      },
      include: {
        bookmarks: true,
      },
    });

    const users = [];

    for (const project of projects) {
      for (const bookmark of project.bookmarks) {
        users.push(bookmark);
      }
    }

    if (projects) {
      return new UserResponse({
        statusCode: 200,
        message: "Bookmarks found successfully",
        data: users.map(user => new UserEntity(user)),
      });
    }
    return new UserResponse({ statusCode: 404, message: "Bookmarks not found" });
  }

  async findOneDetailed(jwt: string): Promise<UserResponse> {
    const decoded = await this.jwtService.decode(jwt);
    //@ts-ignore
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
    try {
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
    } catch {
      throw new BadRequestException("Something went wrong while updating a user");
    }
  }

  async updateAuthorization(identifier: string, authorization: AuthorizationEntity) {
    const user = (await (await this.findOne(identifier)).data) as UserEntity;

    if (authorization.accessToken) user.authorization.accessTokens.push(authorization.accessToken);
    if (authorization.refreshToken) user.authorization.refreshTokens.push(authorization.refreshToken);

    await this.updateOne(identifier, user);
  }

  async addSkill(skill: SkillDto): Promise<SkillResponse> {
    let user;
    try {
      user = await prisma.userSkills.create({
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
      await this.elastic.addSkillToUser(skill);
    } catch {
      throw new BadRequestException("Something went wrong while adding a skill");
    }
    return new SkillResponse({ statusCode: 200, message: "Skill added successfully", data: new SkillEntity(user) });
  }

  async replaceSkills(skills: SkillDto[]): Promise<SkillResponse> {
    //delete all skills from user
    await prisma.userSkills.deleteMany({
      where: {
        user: {
          identifier: skills[0].identifier,
        },
      },
    });

    const skillResponses = [];
    for (const skill of skills) {
      skillResponses.push(await this.addSkill(skill));
    }

    return new SkillResponse({ statusCode: 200, message: "Skills added successfully", data: null });
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

    let oldUser;

    try {
      oldUser = await prisma.users.findUnique({
        where: {
          identifier: id,
        },
      });
    } catch {
      throw new BadRequestException("Something went wrong while updating the user");
    }

    let workHourChanges = updateUserDto.workHourChanges;

    delete updateUserDto.workHourChanges;

    try {
      user = await prisma.users.update({
        where: {
          identifier: id,
        },
        data: {
          ...updateUserDto,
          password: oldUser.password,
          birthDate: new Date(updateUserDto.birthDate.toString()),
          workHourChanges: workHourChanges,
        },
      });
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

  async getLocations(): Promise<LocationResponse> {
    try {
      const locations = await prisma.users.findMany({
        distinct: ["location"],
        select: {
          location: true,
        },
      });
      return new LocationResponse({ statusCode: 200, message: "Locations found successfully", data: locations.map(location => new LocationEntity(location)) });
    } catch {
      throw new BadRequestException("Something went wrong while getting the locations");
    }
  }

  async changeWorkHours(changeWorkHours, jwt: string): Promise<UserResponse> {
    const decoded = await this.jwtService.decode(jwt);
    //@ts-ignore
    const identifier = decoded.identifier;
    try {
      const user = await prisma.users.update({
        where: {
          identifier: identifier,
        },
        data: {
          workHourChanges: changeWorkHours.workHours,
        },
      });
      return new UserResponse({ statusCode: 200, message: "Work hours changed successfully", data: new UserEntity(user) });
    } catch {
      throw new BadRequestException("Something went wrong while changing the work hours");
    }
  }

  async getWorkHours(identifier: string) {
    try {
      const user = await prisma.users.findUnique({
        where: {
          identifier,
        },
      });
      // map through user.workHourChanges and accumulate the hours with default being users.defaultWorkHours
      user.workHourChanges.map(change => {
        change.hours += user.defaultWorkHours;
      });

      return new UserResponse({
        statusCode: 200,
        message: "Work hours found successfully",
        data: user.workHourChanges,
      });
    } catch {
      throw new BadRequestException("Something went wrong while returning the work hours");
    }
  }
}
