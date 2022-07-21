import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { AuthorizationResponse } from "./entities/authorization.entity";
import { LocalAuthGuard } from "./local-auth.guard";
import { JwtRefreshTokenAuthGuard } from "./refresh/refresh-auth.guard";

@ApiBearerAuth()
@ApiTags("auth")
@Controller("/api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  @ApiOperation({ summary: "Login" })
  @ApiResponse({ status: 201, type: AuthorizationResponse })
  async login(@Body() body: LoginDto): Promise<AuthorizationResponse> {
    return this.authService.login(body);
  }

  @UseGuards(JwtRefreshTokenAuthGuard)
  @Post("/refresh")
  @ApiOperation({ summary: "Refresh token" })
  @ApiResponse({ status: 201, type: AuthorizationResponse })
  async refresh(@Req() request): Promise<AuthorizationResponse> {
    return new AuthorizationResponse({
      statusCode: 201,
      message: "Token refreshed",
      data: {
        accessToken: request.user,
        refreshToken: null,
      },
    });
  }
}
