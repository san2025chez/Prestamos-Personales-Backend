import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsOptional, Length } from 'class-validator';



export class ClienteDto implements Readonly<ClienteDto>{

  readonly id?: string;

  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly firstName: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  //@Length(3, 20)
  readonly lastName: string;

  @ApiPropertyOptional({ description: 'Dni del Usuario' })
  // @Length(8, 10)
  readonly dni: string;

  
  @ApiProperty({ description: 'Genero del usuario' })
  readonly gender: string;


  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly barrio: string;



  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly calle: string;
 
  @ApiProperty({ description: 'Nombres del usuario' })
  @IsString()
  @IsOptional()
  //  @Length(3, 20, { message: 'the name between 3-20 caracteres' })
  readonly numero: string;

  @ApiProperty({ description: 'Telefono del usuario' })
  readonly phone: string;






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