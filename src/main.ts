import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { SwaggerModule } from '@nestjs/swagger';
import { swagger } from '@infra/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(json({ limit: '200mb' }));

  SwaggerModule.setup('docs', app, swagger(app), {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3000);
}
bootstrap();
