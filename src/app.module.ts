import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { Connection } from 'typeorm';

import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

import { RolsModule } from './rols/rols.module';
import { PermissionsModule } from './permissions/permissions.module';
import { DatabaseModule } from './database/database.module';

import { PrestamoService } from './prestamo/prestamo.service';
import { PrestamoController } from './prestamo/prestamo.controller';
import { PrestamoModule } from './prestamo/prestamo.module';


@Module({
  imports: [
    DatabaseModule,
  
    UsersModule,
    AuthModule,
    
    PrestamoModule,
    RolsModule,
    PermissionsModule,
    PrestamoModule,
  ],
  controllers: [],
  providers: [],
  exports: []
})
export class AppModule {
  constructor(private readonly connection: Connection) { }


}
