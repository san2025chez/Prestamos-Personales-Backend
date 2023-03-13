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
import { CodeModule } from '../code/code.module';
import { MailerNestModule } from '../mailer/mailer.module';
import { MailerService, MailerModule, HandlebarsAdapter } from '@nest-modules/mailer';
import config from '../mailer/config';
const mail = config.USER;
const password = config.PASSWORD;
const mailProvider = '@smtp.gmail.com';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), MailerModule.forRoot({
      transport: 'smtps://' + mail + ':' + password + mailProvider,
      /*  transport: { host: mailProvider, port:  Number(587),
       auth: { user: mail, pass: password }}, */
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '../email-templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    UsersModule,
    RolsModule,
    /* CustomersModule,
    SellerModule, */
    PassportModule,
    CodeModule,
    MailerNestModule,
    JwtModule.register({
      secret: 'Comprartir',
      signOptions: { expiresIn: 3600 },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  exports: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule { }