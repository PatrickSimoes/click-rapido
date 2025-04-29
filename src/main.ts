import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './common/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // remove props não-decoradas
      transform: true,       // transforma payload em instância de DTO
      forbidNonWhitelisted: true, // erro se props não listadas
    }),
  );

  setupSwagger(app);

  const PORT = process.env.PORT || 3000;
  
  await app.listen(PORT);

  Logger.log(`Server running on http://localhost:${PORT}`, 'Bootstrap');
}

bootstrap();
