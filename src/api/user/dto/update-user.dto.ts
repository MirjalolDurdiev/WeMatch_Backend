import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from 'src/common/database/Enum';

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
    description: 'Email address of the user (optional)',
    type: String,
    example: 'johndoe@example.com',
    required: false,
  })
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
  @IsEnum(UserRoles)
  @IsOptional()
  role?: UserRoles;

  @ApiProperty({
    description: 'Profile image of the user (optional)',
    type: 'string',
    format: 'binary',
    required: false,
  })
  @IsOptional()
  image?: Express.Multer.File; 
}
