import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ElasticService } from "./elastic.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";

@Module({
  imports: [ConfigModule],
  providers: [ElasticService],
})
export class ElasticModule { }
