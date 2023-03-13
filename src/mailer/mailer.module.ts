import { Module } from '@nestjs/common';
import { NodeMailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  providers: [NodeMailerService],
  controllers: [MailerController],
  exports: [NodeMailerService],
})
export class MailerNestModule {}
