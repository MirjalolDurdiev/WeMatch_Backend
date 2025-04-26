import { ApiProperty } from '@nestjs/swagger';
import { OpportunityType, ExperienceLevel, Category, PaymentType } from 'src/common/database/Enum';

export class OpportunityResponseDto {
    @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000', description: 'Unique ID of the opportunity' })
    id: string;

    @ApiProperty({ example: 'Software Engineer Intern', description: 'Name of the opportunity' })
    name: string;

    @ApiProperty({ example: 'We are looking for a talented intern...', description: 'Detailed description' })
    description: string;

    @ApiProperty({ example: 'Remote', description: 'Location of the opportunity' })
    location: string;

    @ApiProperty({ enum: OpportunityType, example: OpportunityType.INTERNSHIP })
    opportunityType: OpportunityType;

    @ApiProperty({ enum: ExperienceLevel, example: ExperienceLevel.JUNIOR })
    experienceLevel: ExperienceLevel;

    @ApiProperty({ enum: Category, example: Category.TECH })
    category: Category;

    @ApiProperty({ enum: PaymentType, example: PaymentType.PAID })
    paymentType: PaymentType;

    @ApiProperty({ example: 'https://example.com/image.jpg', nullable: true })
    image?: string | null;

    @ApiProperty({ example: '2023-01-15T00:00:00.000Z', description: 'Creation date' })
    created_at: Date;

    @ApiProperty({ example: '2023-01-20T00:00:00.000Z', description: 'Last update date' })
    updated_at: Date;
}

export class PaginatedOpportunityResponseDto {
    @ApiProperty({ type: [OpportunityResponseDto], description: 'List of opportunities' })
    data: OpportunityResponseDto[];

    @ApiProperty({ example: 100, description: 'Total number of opportunities' })
    total: number;

    @ApiProperty({ example: 1, description: 'Current page number' })
    page: number;

    @ApiProperty({ example: 10, description: 'Number of items per page' })
    limit: number;
}