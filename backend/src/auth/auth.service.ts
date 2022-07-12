import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/entities/user.entity";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "./constants";
import { LoginDto } from "./dto/login.dto";
import { Authorization, AuthorizationResponse } from "./entities/authorization.entity";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

  async validateUser(identifier: string, pass: string): Promise<any> {
    const user = (await this.userService.findOne(identifier)).data as UserEntity;

    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
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
