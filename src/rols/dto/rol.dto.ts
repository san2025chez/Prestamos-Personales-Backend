import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class RolDto {
    @ApiProperty({ description: 'id del rol' })
    @IsString()
    readonly id: string;
    @ApiProperty({ description: 'nombre del rol' })
    @IsString()
    readonly name: string;
    @ApiProperty({ description: 'descripcion del rol' })
    @IsString()
    readonly descripcion: string;

    // @ApiProperty({description: 'Tipo de producto'})
    // readonly producType: ProductTypeDto;

}