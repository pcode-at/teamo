import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthorizationResponse } from "./entities/authorization.entity";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtRefreshTokenAuthGuard } from "./refresh/refresh-auth.guard";

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Body() body: LoginDto): Promise<AuthorizationResponse> {
    return this.authService.login(body);
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post("/refresh")
  async refresh(@Req() request): Promise<any> {
    return { accessToken: request.user };
  }
}
