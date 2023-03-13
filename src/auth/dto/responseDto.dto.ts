import { ApiProperty } from '@nestjs/swagger';
import { CodeDto } from '../../code/dto/code.dto';

export class ValidateResponseDto {

    @ApiProperty()
    readonly succeses: boolean;

    @ApiProperty({ type: CodeDto })
    readonly code: CodeDto;

    @ApiProperty()
    readonly message: string;

}
