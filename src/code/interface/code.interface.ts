import { ApiProperty } from '@nestjs/swagger';

export interface ICode {
    readonly id: string;
    readonly email: string;
    readonly nroCel: string;
    readonly code: string;
    readonly expired: number;
    readonly validate: boolean;
    readonly expiredAt: string;
    readonly uso: boolean;
}
