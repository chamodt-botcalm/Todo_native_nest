import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
  }));
  
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
