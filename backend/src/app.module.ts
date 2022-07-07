import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { AuthModule } from "./auth/auth.module";
import { SkillController } from './skill/skill.controller';
import { SkillService } from './skill/skill.service';
import { SkillModule } from './skill/skill.module';
import "dotenv/config";

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    ProjectModule,
    AuthModule,
    CacheModule.register({
      isGlobal: true,
    }),
    SkillModule,
  ],
  controllers: [AppController, SkillController],
  providers: [AppService, SkillService],
})
export class AppModule {}
