import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class MailerRecommendDto {

    @ApiProperty({description: 'nickname of the recommender user'})
    @IsNotEmpty()
    @IsString()
    nick: string;

    @ApiProperty({description: 'email to send new user'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'subject of the message body'})
    @IsNotEmpty()
    @IsString()
    subject: string;

    @ApiProperty({description: 'email body'})
    @IsNotEmpty()
    @IsString()
    message: string;
}
