import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Res() response, @Body() body: LoginDto) {
    const { statusCode: status, ...data } = await this.authService.login(body);
    return response.status(status).json(data);
  }
}
