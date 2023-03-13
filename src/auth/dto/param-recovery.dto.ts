import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ParamRecoveryDto {
    @ApiProperty({ description: 'email de recuperacion de contraseña' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class NumberRecoveryDto {
    @ApiProperty({ description: 'nro de recuperacion de contraseña' })
    nroCel: string;
}
