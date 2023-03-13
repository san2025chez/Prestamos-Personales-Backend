import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class validateNickEmailQueryDto {

    @ApiProperty({ description: 'Email para validacion', type: String })
@IsEmail()
 @IsNotEmpty()
    email: string;

}

