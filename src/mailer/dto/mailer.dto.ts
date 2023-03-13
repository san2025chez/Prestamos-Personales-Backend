import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class MailerDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({description: 'Email del usuario a enviar el codigo'})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({description: 'Cuerpo para el mensaje'})
    @IsNotEmpty()
    @IsString()
    subject: string;

    @ApiProperty({description: 'Mensaje del email'})
    @IsNotEmpty()
    @IsString()
    message: string;
}
