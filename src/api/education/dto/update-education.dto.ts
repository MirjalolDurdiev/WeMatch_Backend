import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { EducationEnum } from 'src/common/database/Enum';
import { Type } from 'class-transformer';


export class UpdateEducationDto {
  @ApiProperty({ required: false, example: 'Stanford University' })
  @IsOptional()
  @IsString()
  institution?: string;

  @ApiProperty({ required: false, example: 'Master of Science' })
  @IsOptional()
  @IsString()
  degree?: string;

  @ApiProperty({ required: false, example: 'Data Science' })
  @IsOptional()
  @IsString()
  field_of_study?: string;

  @ApiProperty({ required: false, example: '2022-09-01T00:00:00.000Z', type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date?: Date;

  @ApiProperty({ required: false, example: '2026-06-01T00:00:00.000Z', type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date?: Date;

  @ApiProperty({ enum: EducationEnum, default: EducationEnum.FULL_TIME, example: EducationEnum.FULL_TIME })
  @IsEnum(EducationEnum)
  @IsOptional()
  education_type: EducationEnum;

  @ApiProperty({ required: false, example: 'Focusing on deep learning and neural networks' })
  @IsOptional()
  @IsString()
  description?: string;
}