import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RolsModule } from '../rols/rols.module'


@Module({
    imports: [TypeOrmModule.forFeature([User]), RolsModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
