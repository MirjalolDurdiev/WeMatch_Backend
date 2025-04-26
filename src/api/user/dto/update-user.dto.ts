import { IsString, IsEmail, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, UserRoles } from 'src/common/database/Enum';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Full name of the user (optional)',
    type: String,
    example: 'John Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Age of the user',
    type: Number,
    example: 18,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => value ? parseInt(value, 10) : undefined)
  age: number

  @ApiProperty({
    description: 'Gender of the user',
    type: String,
    example: 18,
    required: false,
  })
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender

  @ApiProperty({
    description: 'Location of the user',
    type: String,
    example: "Samarkand",
    required: false,
  })
  @IsString()
  @IsOptional()
  location: string

  @ApiProperty({
    description: 'Email address of the user (optional)',
    type: String,
    example: 'johndoe@example.com',
    required: false,
  })
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Password for the user account (optional)',
    type: String,
    example: 'P@ssw0rd123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Role of the user in the system (optional)',
    enum: UserRoles,
    example: UserRoles.ADMIN,
    required: false,
  })
  @Transform(({ value }) => value === '' ? undefined : value)
  @IsEnum(UserRoles)
  @IsOptional()
  role?: UserRoles;

  @ApiProperty({
    description: 'Bio of the user',
    type: String,
    example: 'Never give up',
    required: false,
  })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty({
    description: 'Profile image of the user (optional)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;
}
