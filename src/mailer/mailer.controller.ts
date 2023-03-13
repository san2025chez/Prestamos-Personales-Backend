import { Controller, Post, Res, Body, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { NodeMailerService } from './mailer.service';
import { MailerOptions } from './mailer.interface';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MailerDto } from './dto/mailer.dto';
import config from './config';
import { MailerRecommendDto } from './dto/mailerRecommend.dto';

@ApiTags('Mailers')
@Controller('mailers')
export class MailerController {
    constructor(private mailerService: NodeMailerService) { }

    // No se usa, se pude reciclar para otro proposito
    /* @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 200, description: 'data returned correctly' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 404, description: "'The resource was not found'" })
    @ApiResponse({ status: 409, description: "Conflict" })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })

    public async postMailer(@Res() res, @Body() body: MailerDto) {
        const mailer = {
            to: config.USER,
            from: config.USER,
            subject: 'De: ' + body.email + ' - Motivo: ' + body.subject,
            text: body.message,
            html: body.message,
        } as MailerOptions;
        try {
            console.log('mailer', mailer);
            const mail = await this.mailerService.sendMail(mailer);
            console.log('mail', mail);
            return res.status(HttpStatus.OK).json(mail);
        } catch (error) {
            console.log('error', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: true, msg: 'error al enviar mail' });
        }
    } */


    @Post('/recommend')
    @UsePipes(new ValidationPipe({ transform: true }))
    @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 500, description: 'Internal Server Error'})
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async postMailerRecommend(@Res() res, @Body() body: MailerRecommendDto) {
        const mailer = {
            to: body.email,
            from: config.USER,
            subject: 'De: ' + config.USER + ' - Motivo: ' + body.subject,
            text: `${body.message}.`,
            html: `${body.message}.`,
        } as MailerOptions;
        try {            
            const mail = await this.mailerService.sendMail(mailer);            
            return res.status(HttpStatus.OK).json(mail);
        } catch (error) {
            console.log('error', error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ err: true, msg: 'error al enviar mail'});
        }
    }
}
