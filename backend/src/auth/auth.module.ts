import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";
import { RefreshModule } from "./refresh/refresh.module";
import { ElasticModule } from "src/elastic/elastic.module";
import { ElasticService } from "src/elastic/elastic.service";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "900s" },
    }),
    RefreshModule,
    ElasticModule,
  ],
  providers: [ElasticService, AuthService, UserService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
