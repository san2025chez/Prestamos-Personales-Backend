import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/user.module';
import { PrestamoController } from './prestamo.controller';
import { Prestamo } from './prestamo.entity';
import { PrestamoService } from './prestamo.service';


@Module({
    imports:[TypeOrmModule.forFeature([Prestamo]),
UsersModule],
controllers: [PrestamoController],
providers: [PrestamoService],
exports: [PrestamoService],
})
export class PrestamoModule {}
