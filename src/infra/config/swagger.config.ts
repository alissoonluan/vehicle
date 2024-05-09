import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const swaggerOptions = new DocumentBuilder()
  .setTitle('Vehicle API')
  .setDescription('The Vehicle API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export const swagger = (app: INestApplication) =>
  SwaggerModule.createDocument(app, swaggerOptions);
