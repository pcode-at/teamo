import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { Authorization } from "./entities/authorization.entity";
import { LocalAuthGuard } from "./local-auth.guard";
import { RefreshAuthGuard } from "./refresh-auth.guard";

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Body() body: LoginDto): Promise<Authorization> {
    return this.authService.login(body);
  }

  @UseGuards(RefreshAuthGuard)
  @Post("/refresh")
  async refresh(@Req() request): Promise<any> {
    return { token: request.user };
  }
}
