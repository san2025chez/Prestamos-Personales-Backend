import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';


export class ValidateDto {

    @ApiPropertyOptional({ description: 'Email del usuario que desea recuperar la contraseña' })
    @IsEmail()
    @IsOptional()
    readonly email: string;

    @ApiPropertyOptional({ description: 'El nro del usuario que desea recuperar la contraseña' })
    @IsString()
    @IsOptional()
    readonly nroCel: string;

    @ApiProperty({ description: 'Codigo generado para reguperar la contraseña' })
    @IsString()
    readonly code: string;

    @ApiProperty({ description: 'Variable para verificar el uso del codigo' })
    @IsString()
    @IsOptional()    
    readonly uso: string;
}
