import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class ParamsUserDto {
    @ApiProperty({
        description: "user id",
        type: 'uuid'
    })
    @IsUUID()
    userId: string
}
