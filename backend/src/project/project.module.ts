import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { UserModule } from 'src/user/user.module';
import { jwtConstants } from 'src/auth/constants';

@Module({
  imports: [JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "900s" },
  })],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule { }
