import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RefreshService } from "./refresh.service";
import { Request } from "express";
import { jwtConstants } from "../constants";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { Authorization, AuthorizationResponse } from "../entities/authorization.entity";

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
  constructor(private readonly refreshService: RefreshService, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.body?.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request?.body?.token;

    const identifier = payload.identifier.userIdentifier.identifier;
    const isValid = await this.refreshService.getToken(identifier, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    const newToken = await this.refreshService.getNewJwtToken(identifier);
    await this.userService.updateAuthorization(identifier, new Authorization({ accessToken: newToken }));
    return newToken;
  }
}
