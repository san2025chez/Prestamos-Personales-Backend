import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from "../users/user.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from '../auth/passport/local.strategy';
import { UsersModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/passport/jwt.strategy';
import { GoogleStrategy } from './passport/google.strategy';
import { RolsService } from '../rols/rols.service';
import { RolsModule } from '../rols/rols.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    UsersModule,
    RolsModule,
    /* CustomersModule,
    SellerModule, */
    PassportModule,


    JwtModule.register({
      secret: 'pepito',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }