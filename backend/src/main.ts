import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Khởi tạo toàn bộ dữ liệu database
  const appService = app.get(AppService);
  await appService.initialize();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
