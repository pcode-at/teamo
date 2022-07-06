import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RefreshService } from "./refresh.service";
import { Request } from "express";
import { jwtConstants } from "./constants";

@Injectable()
export class refreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor(private readonly refreshService: RefreshService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.body.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any) {
    const refreshToken = request?.body?.token;
    const identifier = payload.id.identifier;
    const isValid = await this.refreshService.getToken(identifier, refreshToken);
    if (!isValid) {
      throw new UnauthorizedException();
    }
    return this.refreshService.getNewJwtToken(identifier);
  }
}
