import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';


export class LoginUserDto {

    @ApiProperty({ description: 'Email de logeo del usuario' })
     @IsEmail()
     @IsNotEmpty()
    @ApiPropertyOptional({ description: 'email the user' })
    readonly email: string;

    @ApiProperty({ description: 'Nick logeo del usuario' })
  
@IsNotEmpty()
    @ApiPropertyOptional({ description: ' Nick name the user' })
    readonly nickName: string;

    @ApiProperty({ description: 'Password del usuario para loguearse' })
    @IsNotEmpty()
    @IsString()
    readonly password: string;

}
