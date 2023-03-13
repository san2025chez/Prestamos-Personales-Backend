import { IsEmail } from "class-validator";

export interface JwtPayload {
    id: string;

    email: string;
}
