import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "src/auth/constants";

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "900s" },
  })],
  controllers: [UserController],
  providers: [UserService],
  exports: [MongooseModule],
})
export class UserModule { }
