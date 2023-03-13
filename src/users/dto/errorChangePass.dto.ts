import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class ErrorChangePassDto {
    @ApiProperty({
        description: "error at change pass",
        type: 'string',
        example: 'new and back password not should same | new and repeat password should same'
    })
    @IsString()
    error: string;    
}
