import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseHeaderInterceptor } from './interceptor/response-header.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api')
    .setDescription('backend api description')
    .setVersion('1.0')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 自动过滤Body里的其他参数，防止污染服务器
      transform: true,
      forbidNonWhitelisted: true, // 有其他参数时抛出错误
      transformOptions: {
        enableImplicitConversion: true, // 全局隐式转换，因为network中只传输string
      },
    }),
  );
  app.useGlobalInterceptors(new ResponseHeaderInterceptor());
  app.enableCors();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
