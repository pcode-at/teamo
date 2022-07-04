import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { TestModule } from './test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import 'dotenv/config';

@Module({
  imports: [TestModule, MongooseModule.forRoot(process.env.DATABASE_URL), UserModule],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule { }
