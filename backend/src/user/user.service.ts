import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchDto } from "./dto/search.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaClient, users, UserSkills } from "@prisma/client";
import { SkillDto } from "./dto/skill.dto";
import { searchForUsers } from "src/algorithms/search.algorithm";
import { UserAndSkills } from "src/types/userAndSkills.type";

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}


  async create(createUserDto: CreateUserDto): Promise<users> {
    return await prisma.users.create({
      data: {
        ...createUserDto,
        birthDate: new Date(createUserDto.birthDate.toString()),
        authorization: {
          accessTokens: [],
          refreshTokens: [],
        },
      }
    });
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

  async recommend(projectId: string): Promise<UserAndSkills[]> {
    const existingMember = await prisma.project.findOne({
      where: {
        id: projectId,
      },
      include: {
        members: true,
      },
    });

    const users = await prisma.userSkills.findMany({
      include: {
        skill: true,
        user: true,
      },
    });

    const recommendedUsers = recommendUsers(users);
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(identifier: string) {
    return await prisma.users.findUnique({
      where: {
        identifier,
      },
      include: {
        skills: true,
      },
    });
    //return this.userModel.findOne({ identifier }).populate("skill").exec();
  }

  async findOneAndUpdate(identifier: string, payload: any) {
    const user = await this.findOne(identifier);
    if (user) {
      user.authorization.accessTokens.push(payload);
      //return user.save();
    }
    return null;
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
}
