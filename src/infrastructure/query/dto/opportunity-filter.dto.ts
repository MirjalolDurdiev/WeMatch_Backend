import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString, IsDateString, IsUUID } from 'class-validator';
import { OpportunityType, ExperienceLevel, Category, PaymentType } from 'src/common/database/Enum';

export class OpportunityFilterDto {
    @ApiPropertyOptional({
        description: 'Filter by opportunity name (partial match)',
        example: 'Software Engineer'
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'Filter by location (partial match)',
        example: 'Remote'
    })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiPropertyOptional({
        description: 'Filter by opportunity type (can provide multiple as array)',
        enum: OpportunityType,
        isArray: true,
        example: [OpportunityType.INTERNSHIP, OpportunityType.PART_TIME]
    })
    @IsOptional()
    @IsEnum(OpportunityType, { each: true })
    opportunityType?: OpportunityType | OpportunityType[];

    @ApiPropertyOptional({
        description: 'Filter by experience level (can provide multiple as array)',
        enum: ExperienceLevel,
        isArray: true,
        example: [ExperienceLevel.JUNIOR, ExperienceLevel.MIDDLE]
    })
    @IsOptional()
    @IsEnum(ExperienceLevel, { each: true })
    experienceLevel?: ExperienceLevel | ExperienceLevel[];

    @ApiPropertyOptional({
        description: 'Filter by category (can provide multiple as array)',
        enum: Category,
        isArray: true,
        example: [Category.EDUCATION, Category.TECH]
    })
    @IsOptional()
    @IsEnum(Category, { each: true })
    category?: Category | Category[];

    @ApiPropertyOptional({
        description: 'Filter by payment type (can provide multiple as array)',
        enum: PaymentType,
        isArray: true,
        example: [PaymentType.PAID]
    })
    @IsOptional()
    @IsEnum(PaymentType, { each: true })
    paymentType?: PaymentType | PaymentType[];

    @ApiPropertyOptional({
        description: 'Filter by organization ID',
        example: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    })
    @IsOptional()
    @IsUUID()
    organizationId?: string;

    @ApiPropertyOptional({
        description: 'Filter opportunities created after this date (ISO format)',
        example: '2023-01-01T00:00:00.000Z'
    })
    @IsOptional()
    @IsDateString()
    createdAfter?: string;

    @ApiPropertyOptional({
        description: 'Filter opportunities created before this date (ISO format)',
        example: '2023-12-31T23:59:59.999Z'
    })
    @IsOptional()
    @IsDateString()
    createdBefore?: string;

    @ApiPropertyOptional({
        description: 'Filter opportunities updated after this date (ISO format)',
        example: '2023-01-01T00:00:00.000Z'
    })
    @IsOptional()
    @IsDateString()
    updatedAfter?: string;

    @ApiPropertyOptional({
        description: 'Filter opportunities updated before this date (ISO format)',
        example: '2023-12-31T23:59:59.999Z'
    })
    @IsOptional()
    @IsDateString()
    updatedBefore?: string;
}