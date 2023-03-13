import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class crearDto {
    @ApiProperty({ description: 'nombre del rol' })
    @IsString()
    readonly name: string;
    @ApiProperty({ description: 'descripcion del rol' })
    @IsString()
    readonly descripcion: string;

}