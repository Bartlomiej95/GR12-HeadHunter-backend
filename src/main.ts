import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });

  //CookieParser
  app.use(cookieParser());


  await app.listen(3001);
}
bootstrap();
