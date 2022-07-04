import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      validateCustomDecorators: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.use(helmet());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
