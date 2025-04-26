import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  IsUUID,
} from 'class-validator';
import { SkillLevel } from 'src/common/database/Enum';

export class CreateSkillDto {
  @ApiProperty({
    description: 'The name of the skill',
    example: 'JavaScript',
  })
  @IsString()
  skill_name: string;

  @ApiProperty({
    description: 'Skill level',
    example: SkillLevel.INTERMEDIATE,
    enum: SkillLevel,
  })
  @IsEnum(SkillLevel)
  level: SkillLevel;
}
