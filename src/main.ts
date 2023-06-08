import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { json } from 'express';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as fbase from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { EnvService } from './env/env.service';

const API_DEFAULT_PREFIX = '/api/v1';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  /*   agrego esta linea para validaciones */
 app.useGlobalPipes(new ValidationPipe());
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);

  const options = new DocumentBuilder()
    .setTitle('Prestamos Sanchez Api')
    .setDescription('The API for e-commerce')
    .setVersion('1.0')
    // .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
    .build();

  // Set the config options
  const config = new EnvService().read();


  app.use('/doc', basicAuth({
    challenge: true,
    users: { ['sanchez']: 'sanchez2020' },
  }));

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document);
 await app.listen(3000);

}
bootstrap();

