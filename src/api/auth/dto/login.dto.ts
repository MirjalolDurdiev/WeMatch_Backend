import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
    @ApiProperty({
        example: 'example@example.com',
        description: 'User email address',
    })
    @IsEmail({}, { message: 'Email format incorrect' })
    @IsNotEmpty({ message: 'Email cannot be empty' })
    email: string;

    @ApiProperty({
        example: 'StrongPassword123!',
        description: 'User password',
    })
    @IsString({ message: 'Password should be string' })
    @IsNotEmpty({ message: 'Password cannot be empty' })
    password: string;
}
