import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from '@utils/filters/exceptions.filter';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Autism, EEG, & AI API')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Autism, EEG, & AI API',
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionsFilter(app.get(HttpAdapterHost)));
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  await app.listen(3001);
}
bootstrap();
