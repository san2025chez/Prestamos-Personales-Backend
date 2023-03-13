import { ApiProperty } from "@nestjs/swagger";

export class UserFirebaseDto {
    @ApiProperty({ description: 'token de firebase del Usuario' })
    firebaseRegistrationToken: string;
}  