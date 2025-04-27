import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";

@ApiTags("Auth")
export class RegisterDto {
    @ApiProperty({
        example: "John Doe",
        description: "User full name",
        required: true
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: "user@example.com",
        description: "User email address",
        format: "email",
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: "User1234!",
        description: "Foydalanuvchining paroli (kamida 6 ta belgi)",
        minLength: 6,
        required: true
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: "User1234!",
        description: "Foydalanuvchining paroli (kamida 6 ta belgi)",
        minLength: 6,
        required: true
    })
    @IsNotEmpty()
    @MinLength(6)
    conifirmPassword: string;
}

export class VerifyOtpDto {
    @ApiProperty({
        example: "user@example.com",
        description: "Foydalanuvchining elektron pochta manzili",
        format: "email",
        required: true
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "123456",
        description: "Foydalanuvchiga yuborilgan 6 xonali OTP kod",
        minLength: 6,
        maxLength: 6,
        required: true
    })
    @IsNotEmpty()
    @Length(6, 6)
    otp: string;
}
