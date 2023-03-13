
import { UserDto } from "../../users/dto/user.dto";


export interface RegistrationResponse {
    success: boolean;
    message: string;

    user: UserDto;

}
