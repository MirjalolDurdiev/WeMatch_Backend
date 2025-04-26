import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorator/current-user';
import { UserEntity } from 'src/core/entity';

@ApiBearerAuth('access-token')
@ApiTags('Organizations') 
@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) { }

  @Post('create')
  @ApiOperation({ summary: 'Create a new organization' })
  @ApiResponse({ status: 201, description: 'Organization successfully created' })
  async createOrganization(@Body() createOrganizationDto: CreateOrganizationDto, @CurrentUser() user: UserEntity) {
    return this.organizationService.create(createOrganizationDto, user.id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all organizations' })
  @ApiResponse({ status: 200, description: 'Organizations retrieved successfully' })
  async getAllOrganizations() {
    return this.organizationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization by ID' })
  @ApiResponse({ status: 200, description: 'Organization retrieved successfully' })
  async getOrganizationById(@Param('id') id: string) {
    return this.organizationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing organization' })
  @ApiResponse({ status: 200, description: 'Organization successfully updated' })
  async updateOrganization(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.organizationService.update(id, updateOrganizationDto, user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete an organization' })
  @ApiResponse({ status: 200, description: 'Organization successfully deleted' })
  async deleteOrganization(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.organizationService.remove(id, user.id);
  }
}
