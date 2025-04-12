import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DatabaseExceptionFilter } from './exception/filter/database-exception.filter';
import { GenericExceptionFilter } from './exception/filter/generic-exception.filter';
import { HttpExceptionFilter } from './exception/filter/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new GenericExceptionFilter(),
    new HttpExceptionFilter(),
    new DatabaseExceptionFilter(),
  );

  const config = new DocumentBuilder()
    .setTitle('Evidencia Node 2')
    .setDescription('Avance de proyecto de sistema de ventas')
    .setVersion('1.0')
    .addBearerAuth({
      name: 'Security Token',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true,
    }),
  );

  await app.listen(8080);
  logger.log('App running on port 8080');
}
void bootstrap();
