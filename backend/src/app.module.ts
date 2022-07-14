import { CacheModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "./user/user.module";
import { ProjectModule } from "./project/project.module";
import { AuthModule } from "./auth/auth.module";
import { SkillController } from "./skill/skill.controller";
import { SkillService } from "./skill/skill.service";
import { SkillModule } from "./skill/skill.module";
import { ElasticController } from "./elastic/elastic.controller";
import { ElasticModule } from "./elastic/elastic.module";
import "dotenv/config";
import { ElasticService } from "./elastic/elastic.service";
import { ImageCropController } from './image-crop/image-crop.controller';
import { ImageCropService } from './image-crop/image-crop.service';
import { ImageCropModule } from './image-crop/image-crop.module';

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
    ElasticModule,
    ImageCropModule,
  ],
  controllers: [AppController, SkillController, ElasticController, ImageCropController],
  providers: [AppService, SkillService, ElasticService, ImageCropService],
})
export class AppModule {}
