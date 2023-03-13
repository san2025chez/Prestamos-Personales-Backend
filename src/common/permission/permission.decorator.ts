import { SetMetadata } from '@nestjs/common';

export const Permision = (...permission: string[]) => SetMetadata('permission', permission);
