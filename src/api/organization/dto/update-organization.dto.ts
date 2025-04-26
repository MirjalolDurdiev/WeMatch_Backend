import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrganizationDto {
  @ApiProperty({
    description: 'The name of the organization (optional)',
    type: String,
    example: 'Tech Corp',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'A brief description of the organization (optional)',
    type: String,
    example: 'A leading tech company providing innovative solutions',
    required: false,
  })
  description?: string;
}
