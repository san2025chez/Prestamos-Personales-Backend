
import { ClienteDto } from "../../users/dto/cliente.dto";


export interface RegistrationCliente {
    success: boolean;
    message: string;

    user: ClienteDto;

}
