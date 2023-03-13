import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CredentialsDto {
    @ApiProperty({ description: 'ID codigo de recuperacion' })
    @IsString()
    codeID: string;
    @ApiPropertyOptional({ description: 'Email del usuario que necesita recuperar la contraseña' })    
    email: string;
    @ApiPropertyOptional({ description: 'Nro de celular del usuario que necesita recuperar la contraseña' })
    nroCel: string;
    @ApiProperty({ description: 'Codigo de recuperacion' })
    code: string;
    @ApiProperty({ description: 'Nueva password' })
    @IsNotEmpty()
    pass: string;
    @ApiProperty({ description: 'Se repite la nueva password' })
    @IsNotEmpty()
    repeatPass: string;
}
