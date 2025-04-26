import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { OpportunityType, ExperienceLevel, Category, PaymentType } from 'src/common/database/Enum';

export class CreateOpportunityDto {
    @ApiProperty({ example: 'Frontend Developer', description: 'The name of the opportunity' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'We are looking for a frontend developer', description: 'A short description of the opportunity' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'New York', description: 'Location of the opportunity' })
    @IsString()
    location: string;

    @ApiProperty({ example: OpportunityType.INTERNSHIP, description: 'Type of the opportunity', enum: OpportunityType })
    @IsEnum(OpportunityType)
    opportunityType: OpportunityType;

    @ApiProperty({ example: ExperienceLevel.MIDDLE, description: 'Required experience level', enum: ExperienceLevel })
    @IsEnum(ExperienceLevel)
    experienceLevel: ExperienceLevel;

    @ApiProperty({ example: Category.TECH, description: 'Category of the opportunity', enum: Category })
    @IsEnum(Category)
    category: Category;

    @ApiProperty({
        description: 'Profile image of the user (optional)',
        type: 'string',
        format: 'binary',
        required: false,
    })
    @IsOptional()
    image?: Express.Multer.File;

    @ApiProperty({ example: 'unpaid', description: 'Payment type of the opportunity', enum: PaymentType, required: false })
    @IsEnum(PaymentType)
    @IsOptional()
    paymentType?: PaymentType;
}
