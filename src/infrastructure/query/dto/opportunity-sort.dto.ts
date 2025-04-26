import { IsOptional, IsEnum } from 'class-validator';
export enum SortOrder {
    ASC = 'asc',
    DESC = 'desc',
}
export class OpportunitySortDto {
    @IsOptional()
    @IsEnum(SortOrder)
    name?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    location?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    opportunityType?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    experienceLevel?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    category?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    paymentType?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    created_at?: SortOrder;

    @IsOptional()
    @IsEnum(SortOrder)
    updated_at?: SortOrder;
}