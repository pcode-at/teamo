import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaClient } from "@prisma/client";
import { UserService } from "src/user/user.service";

const prisma = new PrismaClient();

@Injectable()
export class RefreshService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async getToken(identifier: string, token: string): Promise<Boolean> {
    const user = await this.userService.findOne(identifier);
    //check if token is in user authorization
    console.log(user.data.authorization.refreshTokens);

    return true;
  }

  async getNewJwtToken(identifier: string) {
    return this.jwtService.sign(identifier);
  }
}
