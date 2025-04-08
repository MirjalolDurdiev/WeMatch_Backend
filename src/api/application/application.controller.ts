import { Controller, Post, Patch, Param, Body } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { CurrentUser } from 'src/common/decorator/current-user';
import { OrganizationEntity, UserEntity } from 'src/core/entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Applications')
@ApiBearerAuth('access-token')
@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }

  @ApiOperation({ summary: 'Create a new application (User only)' })
  @ApiResponse({ status: 201, description: 'Application created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.applicationService.create(createApplicationDto, user);
  }

  @ApiOperation({ summary: 'Update application status (Organization only)' })
  @ApiResponse({ status: 200, description: 'Application status updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Application not found' })
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
    @CurrentUser() organization: OrganizationEntity, // Organization entity expected here
  ) {
    return this.applicationService.updateStatus(id, updateApplicationDto, organization.id);
  }
}
