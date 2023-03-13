import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user.entity";

export class PrestamoDto {
    @ApiProperty({ description: 'id user' })
    readonly user: string;
    @ApiProperty({ description: 'id user' })
    readonly monto: number;
    @ApiProperty({ description: 'id user' })
    readonly interes: number;
    @ApiProperty({ description: 'id user' })
    readonly montoTotal: number;
    @ApiProperty({ description: 'id user' })
    readonly prenda: string; 
    @ApiProperty({ description: 'id user' })
    readonly descripcion: string;
    @ApiProperty({ description: 'id user' })
    readonly userficticio: string;
    @ApiProperty({ description: 'id user' })
    readonly lastNameficticio: string;

  
}