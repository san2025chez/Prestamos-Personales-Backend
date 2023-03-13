import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class updateLoanDTO {
    @ApiProperty({ required: true, description: 'Direccion' })
    @IsString()
    @IsOptional()
    id: string;

    @ApiProperty({ required: true, description: 'Direccion' })
    @IsNumber()
    @IsOptional()
    monto: number;

    @ApiProperty({ required: true, description: 'Direccion' })
    @IsNumber()
    @IsOptional()
    interes: number;

    @ApiProperty({ required: true, description: 'CUIT ' })
    @IsNumber()
    @IsOptional()
    montoTotal: number;

    @ApiProperty({ required: true, description: 'PAIS' })
    @IsOptional()
    prenda: string;

    @ApiProperty({ required: true, description: 'PROVINCIA' })
    @IsOptional()
descripcion: string;



@ApiProperty({ required: true, description: 'PROVINCIA' })
@IsOptional()
user: string;

@ApiProperty({ required: true, description: 'PROVINCIA' })
@IsOptional()

date: Date;
@ApiProperty({ required: true, description: 'PROVINCIA' })
@IsOptional()
origen: string;
@ApiProperty({ required: true, description: 'PROVINCIA' })
@IsOptional()
userficticio: string;
@ApiProperty({ required: true, description: 'PROVINCIA' })
@IsOptional()
lastNameficticio: string;
@ApiProperty({ required: true, description: 'PROVINCIA' })
@IsOptional()
createAt: Date;
    
}