import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user.entity";

export class LoanDto {
    @ApiProperty({ description: 'id user' })
    readonly user: User;
    @ApiProperty({ description: 'monto' })
    readonly monto: number;
    @ApiProperty({ description: 'interes' })
    readonly interes: number;
    @ApiProperty({ description: 'montoTotal' })
    readonly montoTotal: number;
    @ApiProperty({ description: 'prenda' })
    readonly prenda: string; 
    @ApiProperty({ description: 'description' })
    readonly descripcion: string;

  
}