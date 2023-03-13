import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ValidateMailDto {

    @ApiProperty({ description: 'Email de logeo del usuario' })
    @IsEmail()
    readonly email: string;

}
