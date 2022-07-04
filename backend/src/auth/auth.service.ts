import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { use } from "passport";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/login.dto";
import { Authorization } from "./entities/authorization.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(identifier);
    //encrypt using bcrypt here (10 rounds)
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: LoginDto): Promise<Authorization> {
    const userIdentifier = { identifier: payload.identifier };
    const accessToken = this.jwtService.sign(userIdentifier);
    await this.userService.findOneAndUpdate(payload.identifier, accessToken);

    return {
      status: 200,
      message: "Login successful",
      accessToken,
    };
  }
}
