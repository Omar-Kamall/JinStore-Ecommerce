import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionDB } from '../config/db.config';
import { setupSwagger } from '../config/swagger.config';
import { ZodValidationPipe } from 'nestjs-zod';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    await connectionDB();
  } catch (error) {
    throw new Error(`${error}`);
  }

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useLogger(app.get(Logger));
  app.use(cookieParser());
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 5050);
}
bootstrap().catch((error: Error) => console.log(error.message));
