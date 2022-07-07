import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "../constants";
import { JwtStrategy } from "../jwt.strategy";
import { RefreshService } from "./refresh.service";
import { RefreshStrategy } from "./refresh.strategy";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "900s" },
    }),
  ],
  providers: [UserService, RefreshService, RefreshStrategy, JwtStrategy],
  exports: [RefreshService],
})
export class RefreshModule {}
