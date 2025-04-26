import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
    @ApiProperty({
        description: 'The current password of the user',
        example: 'StrongPassword123!',
    })
    @IsString()
    currentPassword: string;

    @ApiProperty({
        description: 'The new password to be set for the user',
        example: 'newPassword123',
    })
    @IsString()
    @MinLength(6, { message: 'New password must be at least 6 characters long' })
    newPassword: string;
}

export class ForgotPasswordDto {
    @ApiProperty({
        description: 'The email address of the user requesting a password reset',
        example: 'example@example.com',
    })
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({
        description: 'The OTP code sent to the user for verification',
        example: '123456',
    })
    @IsString()
    otp: string;  // OTP kodini kiritish

    @ApiProperty({
        description: 'The reset token required to reset the password',
        example: 'some-reset-token',
    })
    @IsString()
    email: string;  // Reset token

}
export class ResetPasswordWithTokenDto {
    @ApiProperty({
        description: 'The new password to be set for the user',
        example: 'newPassword123',
    })
    @IsString()
    @MinLength(6, { message: 'New password must be at least 6 characters long' })
    newPassword: string;
}