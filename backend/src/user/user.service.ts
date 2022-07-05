import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchDto } from "./dto/search.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async search(search: SearchDto): Promise<User[]> {
    const mustHave = search.searches.filter(search => search.mustHave).map(search => search.attribute);
    if (mustHave.includes("location")) {
      const location = search.searches.find(search => search.attribute === "location").value;

      return this.userModel
        .find({
          where: {
            location,
            skills: {
              skill: {
                name: {
                  in: mustHave,
                },
              },
            },
          },
        })
        .exec();
    }
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
