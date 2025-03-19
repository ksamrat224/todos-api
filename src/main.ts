import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //Application instance is created here
  const app = await NestFactory.create(AppModule);

  //Middleware is applied here
  app.useGlobalPipes(new ValidationPipe());

  //Application stats here
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
