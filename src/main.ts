import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // remove props não-decoradas
      transform: true,       // transforma payload em instância de DTO
      forbidNonWhitelisted: true, // erro se props não listadas
    }),
  );
  await app.listen(process.env.PORT ?? 3000);

  Logger.log(`Server running on http://localhost:${process.env.PORT}`, 'Bootstrap');
}

bootstrap();
