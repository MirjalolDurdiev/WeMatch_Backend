import { Injectable, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'src/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/infrastructure/filter/all-exception.filter';
import * as express from 'express';
import { join } from 'path';

@Injectable()
export class Application {
  public static async main(): Promise<void> {
    let app = await NestFactory.create(AppModule);
    // app.useGlobalFilters(new AllExceptionFilter());
    app.enableCors({ origin: '*' });

    app.use('/images', express.static(join(process.cwd(), 'uploads')));

    const swagger = new DocumentBuilder()
      .setTitle('WeMatch backend')
      .setDescription('WeMatch API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'access-token',
      )
      .build();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Faqat DTO ichidagi maydonlarni qabul qiladi, ortiqcha maydonlarni o‘chirib tashlaydi
        // forbidNonWhitelisted: true,  // Ortib ketgan maydonlar bo‘lsa xatolik qaytaradi
        forbidNonWhitelisted: false, // DTO da yo‘q maydonlar bloklanmasin
        transform: true, // String qiymatlarni avtomatik mos tipga o‘zgartiradi (masalan, number yoki boolean)
      }),
    );

    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('api', app, document);
    await app.listen(config.PORT, () => {
      console.log(`Server running in ${config.PORT}`);
    });
  }
}
