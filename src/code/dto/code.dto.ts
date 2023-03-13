import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CodeDto {
    @ApiProperty()
    readonly id?: string;

    @ApiProperty({ description: 'Email del usuario que desea recuperar la contraseña' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'nro del usuario que desea recuperar la contraseña' })
    @IsString()
    readonly nroCel: string;

    @ApiProperty({ description: 'Codigo generado para reguperar la contraseña' })
    @IsString()
    readonly code: string;

    @ApiProperty({ description: 'Variable para ver si el codigo esta valido para usar o no' })
    readonly validate: boolean;

    @ApiProperty({ description: 'Fecha de expiracion del codigo, 30min' })
    @IsString()
    readonly expiredAt: string;

    @ApiProperty({ description: 'Variable que me indica si ya se uso o no el codigo' })
    readonly uso: boolean;

}
