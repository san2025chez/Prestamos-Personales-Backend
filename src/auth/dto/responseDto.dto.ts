import { ApiProperty } from '@nestjs/swagger';


export class ValidateResponseDto {

    @ApiProperty()
    readonly succeses: boolean;


    @ApiProperty()
    readonly message: string;

}
