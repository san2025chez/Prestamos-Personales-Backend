import { ApiProperty } from "@nestjs/swagger";
import { User } from "../../users/user.entity";

export class LoanDto {
    @ApiProperty({ description: 'id user' })
    readonly user: User;
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

  
}