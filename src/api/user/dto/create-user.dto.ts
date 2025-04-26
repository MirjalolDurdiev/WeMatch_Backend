import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, UserRoles } from 'src/common/database/Enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    type: String,
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Bio of the user',
    type: String,
    example: 'Never give up',
  })
  @IsString()
  @IsOptional()
  bio: string;

  @ApiProperty({
    description: 'Age of the user',
    type: String,
    example: 18,
  })
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiProperty({
    description: 'Gender of the user',
    type: String,
    example: 'Male',
  })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    description: 'Location of the user',
    type: String,
    example: 'Tashkent',
  })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({
    description: 'Email address of the user',
    type: String,
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the user account',
    type: String,
    example: 'P@StrongPassword123!',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Role of the user in the system',
    enum: UserRoles,
    example: UserRoles.ADMIN,
  })
  @IsEnum(UserRoles)
  role: UserRoles;

  @ApiProperty({
    description: 'Profile image of the user (optional)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File;
}
