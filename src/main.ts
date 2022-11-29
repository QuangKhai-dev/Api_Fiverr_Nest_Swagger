import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //chặn truy cập link không có
  app.enableCors();

  // set path main cho tất cả các tuyến đường
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  // app.use(json({ limit: '50mb' }));

  const config = new DocumentBuilder()
    .setTitle('Fiverr Api by Quach Khai')
    .setDescription('The Fiverr API description')
    // add BearerAuth in swagger header
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
