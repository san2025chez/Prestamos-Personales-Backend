import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { UserDto } from './user.dto';

export class UserSellerDto extends UserDto {
    /*   @ApiProperty({ description: 'Si es Vendedor' })
      @IsNotEmpty()
      seller: Seller; */
}
