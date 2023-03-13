import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import { MailerOptions } from './mailer.interface';

@Injectable ()
export class NodeMailerService {
    constructor(private readonly mailerService: MailerService) { }

    async sendMail(mailer: MailerOptions) {
        return await this.mailerService.sendMail(mailer);
    }
}
