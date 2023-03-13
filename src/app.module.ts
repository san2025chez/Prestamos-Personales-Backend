import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { Connection } from 'typeorm';

import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

import { RolsModule } from './rols/rols.module';
import { PermissionsModule } from './permissions/permissions.module';
import { MailerNestModule } from './mailer/mailer.module';
import { CodeModule } from './code/code.module';
import { MailerModule } from '@nest-modules/mailer';

import { DatabaseModule } from './database/database.module';

import { IntegracionModule } from './integracion/integracion.module';
import { PrestamoService } from './prestamo/prestamo.service';
import { PrestamoController } from './prestamo/prestamo.controller';
import { PrestamoModule } from './prestamo/prestamo.module';


@Module({
  imports: [
    DatabaseModule,
  
    UsersModule,
    AuthModule,
    /*  CustomersModule, */
    /*  SellerModule, */


    /*   CustomersModule, */
    PrestamoModule,
    RolsModule,
    PermissionsModule,
    MailerNestModule,
    MailerModule,
    CodeModule,
 
  
    IntegracionModule,
 
  
    PrestamoModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
  //configure(consumer: MiddlewareConsumer) {
  //consumer
  /* .apply(Middleware)
  .forRoutes({ path: 'users/:id', method: RequestMethod.GET }); */
  // .forRoutes({ path: 'cats', method: RequestMethod.GET });
  //}

}
