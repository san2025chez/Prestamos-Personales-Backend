import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, Length } from 'class-validator';



export class UserDto {

  readonly id?: string;

  @ApiProperty({ description: 'Password del Usuario' })
  @IsOptional()
  readonly password: string;

  @ApiProperty({ description: 'Email' })
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly firstName: string;

  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly calle: string;
  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly barrio: string;
  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly numero: string;

  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly localidad: string;
  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly pais: string;
  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly provincia: string;

  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly latitud: string;

  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly longitud: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  //@Length(3, 20)
  readonly lastName: string;

  @ApiPropertyOptional({ description: 'Nick del usuario referente' })
  readonly nickReferrer: string;
  @ApiPropertyOptional({ description: 'Nick del usuario referente' })
  readonly nickName: string;

  @ApiProperty({ description: 'Telefono del usuario' })
  readonly phone: string;

  @ApiProperty({ description: 'Telefono del usuario' })
  readonly firebaseRegistrationToken: string;

  @ApiProperty({ description: 'Genero del usuario' })
  readonly gender: string;

  @ApiPropertyOptional({ description: 'Dni del Usuario' })
  // @Length(8, 10)
  readonly dni: string;

  @ApiPropertyOptional({ description: 'Foto duuuuuuuuuuu' })
  readonly profilePic: string;

  @ApiPropertyOptional({ description: 'Variable para ver si es customer o seller o los dos', example: 'false' })
  readonly isCustomerAndSeller: boolean;



  /*  @ApiPropertyOptional({ description: 'rol del usuario por defecto' })
   readonly rol: string; */
  /* @ApiPropertyOptional({ description: 'commission del usuario' })
  commisions: Commision[];
 */

 /*  @ApiPropertyOptional({ description: 'Commercio del usuario' })
  commerce: Commerce; */
  @ApiProperty({ description: 'Rol de dicho usuario' })
  rols: any;
}
