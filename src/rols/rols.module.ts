import { Module } from '@nestjs/common';
import { RolsController } from './rols.controller';
import { RolsService } from './rols.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rols } from './rols.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rols])],
  controllers: [RolsController],
  providers: [RolsService],
  exports: [RolsService],
})
export class RolsModule {}
