import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateContributionDto {
    @ApiProperty({ example: "Google", description: "Company name" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    company_name: string;

    @ApiProperty({ example: "Software Engineer", description: "User's position at the company" })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    position: string;

    @ApiProperty({ example: "Developed scalable web applications", description: "Job description", required: false })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: "2023-01-01", description: "Start date of the job" })
    @IsDateString()
    @IsNotEmpty()
    start_date: Date;

    @ApiProperty({ example: "2024-01-01", description: "End date of the job", required: false })
    @IsDateString()
    @IsOptional()
    end_date?: Date;

    @ApiProperty({ example: false, description: "Whether the user is still working at the company" })
    @IsBoolean()
    @IsNotEmpty()
    is_current: boolean;
}