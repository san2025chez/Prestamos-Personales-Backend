import { Module } from '@nestjs/common';
import { CodeService } from './code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from './code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Code])],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule { }
