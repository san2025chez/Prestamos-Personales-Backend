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
  const adminConfig: ServiceAccount = {
    projectId: config.FIREBASE_PROJECT_ID,
    clientEmail: config.FIREBASE_CLIENT_EMAIL,
    privateKey: config.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  };
  // Initialize the firebase admin app
  if (!fbase.apps.length) {
    fbase.initializeApp({
      credential: fbase.credential.cert(adminConfig),
      databaseURL: config.FIREBASE_DATABASE_URL,
    });
  }
  console.log("hhh", config.FIREBASE_DATABASE_URL)
  // Check for firebase initialization
  // if (!fbase.apps.length) {
  //   try {
  //     fbase.initializeApp({
  //       credential: fbase.credential.cert({
  //         projectId: ENV.FIREBASE_PROJECT_ID,
  //         privateKey: ENV.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  //         clientEmail: ENV.FIREBASE_CLIENT_EMAIL,
  //       }),
  //       databaseURL: ENV.FIREBASE_DATABASE_URL

  //     });
  //   } catch (error) {
  //     console.log("error");

  //   }

  // }
  /*   const adminConfig: ServiceAccount = {
      "projectId": configService.get<string>('FIREBASE_PROJECT_ID'),
      "privateKey": configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      "clientEmail": configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    };
  
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
      databaseURL: 
      }); */

  app.use('/doc', basicAuth({
    challenge: true,
    users: { ['sanchez']: 'sanchez2020' },
  }));

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document);
 await app.listen(3000);

}
bootstrap();

