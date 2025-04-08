import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsDate, IsOptional, IsEnum } from 'class-validator';
import { EducationEnum } from 'src/common/database/Enum';

export class CreateEducationDto {
  @ApiProperty({ example: 'Harvard University' })
  @IsString()
  institution: string;

  @ApiProperty({ example: 'Bachelor of Science' })
  @IsString()
  degree: string;

  @ApiProperty({ example: 'Computer Science' })
  @IsString()
  field_of_study: string;

  @Type(() => Date)
  @ApiProperty({ example: '2020-09-01T00:00:00.000Z', type: 'string', format: 'date-time' })
  @IsDate()
  start_date: Date;

  @Type(() => Date)
  @ApiProperty({ required: false, example: '2024-06-01T00:00:00.000Z', type: 'string', format: 'date-time' })
  @IsOptional()
  @IsDate()
  end_date?: Date;

  @ApiProperty({ enum: EducationEnum, default: EducationEnum.FULL_TIME, example: EducationEnum.FULL_TIME })
  @IsEnum(['full_time', 'part_time', 'online'])
  education_type: EducationEnum;

  @ApiProperty({ required: false, example: 'Studied advanced topics in AI and ML' })
  @IsOptional()
  @IsString()
  description?: string;
}