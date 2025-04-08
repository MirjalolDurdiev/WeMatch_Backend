import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsOptional, IsUrl } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateCertificateDto {
  @ApiProperty({ example: 'Full-Stack Web Development', description: 'Sertifikat nomi' })
  @IsString()
  certificate_name: string;

  @ApiProperty({ example: 'Najot Ta’lim', description: 'Sertifikat beruvchi tashkilot' })
  @IsString()
  issued_by: string;

  @ApiProperty({ example: '2025-01-01', description: 'Berilgan sana', type: 'string', format: 'date' })
  @Type(() => Date)
  @IsDate()
  issue_date: Date;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  image?: any;

  @ApiProperty({ example: 'https://certificates.example.com/123', required: false, description: 'Sertifikat URL' })
  @IsOptional()
  @IsUrl()
  certificate_url?: string;

  @ApiProperty({ example: 'Bu sertifikat Full-Stack kursini tugatganimni tasdiqlaydi.', required: false, description: 'Qo‘shimcha izoh' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2027-01-01', required: false, description: 'Sertifikatning amal qilish muddati', type: 'string', format: 'date' })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : null))
  expiration_date?: Date;
}
