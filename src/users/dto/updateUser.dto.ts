import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({ description: 'user id' })
    @IsNotEmpty()
    @IsString()
readonly id: string;

@ApiProperty({ description: 'Email' })
@IsNotEmpty()
@IsEmail()
readonly email: string;
@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly password: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly firstName: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly lastName: string;



@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()

readonly phone: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly gender: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly dni: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly profilePic: string;


@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly pais: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly provincia: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly localidad: string;


@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly calle: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly barrio: string;

@ApiProperty({ description: 'Nombres del usuario' })
@IsString()
@IsOptional()
readonly numero: string;
}