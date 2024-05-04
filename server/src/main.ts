import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.setGlobalPrefix('api');

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // verificar que se envie el body correctp de acuerdo al dt
      forbidNonWhitelisted: true, // tirar error al cliente si intenta mandar otra cosa en el body
      transform: true, // transforem automaticamente los datos siempre que pueda (Params)
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
