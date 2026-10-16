import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionDB } from '../config';
import { setupSwagger } from '../config/swagger';

async function bootstrap() {
  try {
    await connectionDB();
  } catch (error) {
    throw new Error(`${error}`);
  }

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap().catch((error: Error) => console.log(error.message));
