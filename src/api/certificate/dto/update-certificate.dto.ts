import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsUrl } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UpdateCertificateDto {
  @ApiProperty({
    example: 'Full-Stack Web Development',
    required: false,
    description: 'Yangilangan sertifikat nomi',
  })
  @IsOptional()
  @IsString()
  certificate_name?: string;

  @ApiProperty({
    example: 'Najot Ta’lim',
    required: false,
    description: 'Yangilangan beruvchi tashkilot',
  })
  @IsOptional()
  @IsString()
  issued_by?: string;

  @ApiProperty({
    example: '2025-01-01',
    required: false,
    description: 'Yangilangan berilgan sana',
    type: 'string',
    format: 'date',
  })
  @Type(() => Date)
  @IsOptional()
  @IsDate()
  issue_date?: Date;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: any;

  @ApiProperty({
    example: 'https://certificates.example.com/123',
    required: false,
    description: 'Yangilangan sertifikat URL',
  })
  @IsOptional()
  @IsUrl()
  certificate_url?: string;

  @ApiProperty({
    example: 'Sertifikatning amal qilish muddati uzaytirildi.',
    required: false,
    description: 'Yangilangan izoh',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: '2028-01-01',
    required: false,
    description: 'Yangilangan amal qilish muddati',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  expiration_date?: Date;
}
