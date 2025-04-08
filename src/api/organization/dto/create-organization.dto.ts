import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsEmail } from 'class-validator';
import { SubscriptionStatus } from 'src/common/database/Enum';

export class CreateOrganizationDto {
    @ApiProperty({ example: 'Tech Corp', description: 'The name of the organization' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'info@techcorp.com', description: 'The email of the organization' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'securepassword', description: 'The password of the organization' })
    @IsString()
    password: string;

    @ApiProperty({ example: 'We are a tech company', description: 'A short description about the organization', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ example: 'https://techcorp.com', description: 'Website of the organization', required: false })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ example: 'Technology', description: 'Industry the organization belongs to', required: false })
    @IsOptional()
    @IsString()
    industry?: string;

    @ApiProperty({ example: 'PENDING', description: 'Subscription status of the organization', enum: SubscriptionStatus, required: false })
    @IsOptional()
    @IsEnum(SubscriptionStatus)
    subscriptionStatus?: SubscriptionStatus;
}