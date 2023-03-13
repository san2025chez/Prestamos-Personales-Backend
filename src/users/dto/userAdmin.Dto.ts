import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional, IsEmail } from "class-validator";

export class UserAdminDto {

    readonly id?: string;

    @ApiProperty({ description: 'Password del Usuario' })
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({ description: 'Email' })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: 'Nombres del usuario' })
    @IsString()
    @IsOptional()
    //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
    readonly firstName: string;

    @ApiProperty({ description: 'Apellido del usuario' })
    //@Length(3, 20)
    readonly lastName: string;

    @ApiPropertyOptional({ description: 'Nick del usuario referente' })
    readonly nickReferrer: string;
    @ApiPropertyOptional({ description: 'Nick del usuario referente' })
    readonly nickName: string;


    @ApiProperty({ description: 'Telefono del usuario' })
    readonly phone: string;

    @ApiProperty({ description: 'Genero del usuario' })
    readonly gender: string;

    @ApiPropertyOptional({ description: 'Dni del Usuario' })
    // @Length(8, 10)
    readonly dni: string;

    @ApiPropertyOptional({ description: 'Foto duuuuuuuuuuu' })
    readonly profilePic: string;

    @ApiPropertyOptional({ description: 'Variable para ver si es customer o seller o los dos', example: 'false' })
    readonly isCustomerAndSeller: boolean;


}
