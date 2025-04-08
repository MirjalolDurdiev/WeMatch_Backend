import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ApplicationStatus } from 'src/common/database/Enum';

export class UpdateApplicationDto {
    @ApiProperty({
        example: ApplicationStatus.PENDING,
        description: 'Application status',
        enum: ApplicationStatus,
        default: ApplicationStatus.PENDING,
    })
    @IsEnum(ApplicationStatus)
    status: ApplicationStatus;
}
