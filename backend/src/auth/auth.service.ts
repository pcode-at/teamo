import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";
import { LoginDto } from "./dto/login.dto";
import { Authorization, AuthorizationResponse } from "./entities/authorization.entity";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

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
    const authorization = new Authorization({
      accessToken,
      refreshToken,
    });

    await this.userService.updateAuthorization(payload.identifier, authorization);

    return new AuthorizationResponse({
      statusCode: 200,
      message: "Login successful",
      data: authorization
    });
  }

  async decodeJwt(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }
}