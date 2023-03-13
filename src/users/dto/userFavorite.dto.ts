import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';



export class UserFavoriteDto {

    @ApiPropertyOptional({ description: 'array de favorite' })
    favorite: string[];
}