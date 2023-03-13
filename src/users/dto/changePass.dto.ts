import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class ChangePassDto {
    @ApiProperty({
        description: "user back password",
        type: 'string'
    })
    @IsString()
    backPassword: string;
    @ApiProperty({
        description: "user new password",
        type: 'string'
    })
    @IsString()
    newPassword: string;
    @ApiProperty({
        description: "user repeat new password",
        type: 'string'
    })
    @IsString()
    repeatPassword: string;
}
