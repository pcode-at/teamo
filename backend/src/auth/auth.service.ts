import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";
import { LoginDto } from "./dto/login.dto";
import { AuthorizationResponse } from "./entities/authorization.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(identifier);
    //encrypt using bcrypt here (10 rounds)
    if (user && user.data.password === pass) {
      const { password, ...result } = user.data;
      return result;
    }
    return null;
  }

  async login(payload: LoginDto): Promise<AuthorizationResponse> {
    const userIdentifier = { identifier: payload.identifier };
    const accessToken = this.jwtService.sign(userIdentifier);
    const refreshToken = this.jwtService.sign({ identifier: { userIdentifier } }, { expiresIn: jwtConstants.refreshTokenExpiryTime });
    const authorization = new AuthorizationResponse({
      statusCode: 201,
      message: "Login successful",
      data: {
        accessToken,
        refreshToken,
      },
    });

    await this.userService.updateAuthorization(payload.identifier, authorization);

    return authorization;
  }
}
