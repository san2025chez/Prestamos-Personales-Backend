import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';
import { UserDto } from './user.dto';
//import { Customer } from '../../customers/customer.entity';


export class UserCustomerDto extends UserDto {

    @ApiProperty({ description: 'Si es customer' })
    readonly customer: User;

}
