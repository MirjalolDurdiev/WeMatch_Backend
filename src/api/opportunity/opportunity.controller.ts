import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { CurrentUser } from 'src/common/decorator/current-user';
import { OrganizationEntity } from 'src/core/entity/organization.entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiQuery,
  ApiOkResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles/RoleGuard';
import { RolesDecorator } from '../auth/roles/RolesDecorator';
import {
  Category,
  ExperienceLevel,
  OpportunityType,
  PaymentType,
  UserRoles,
} from 'src/common/database/Enum';
import { PaginationDto } from 'src/infrastructure/query/dto/pagination.dto';
import { FilterDto } from 'src/infrastructure/query/dto/filter.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/common/decorator/public';
import { OpportunityFilterDto } from 'src/infrastructure/query/dto/opportunity-filter.dto';
import { OpportunityResponseDto } from './dto/opportunity-response.dto';

@ApiTags('Opportunities')
@ApiBearerAuth('access-token')
@Controller('opportunities')
export class OpportunityController {
  constructor(private readonly opportunityService: OpportunityService) {}

  @ApiOperation({ summary: 'Create a new opportunity (Organization only)' })
  @ApiResponse({ status: 201, description: 'Opportunity created successfully' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.SUPER_ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createOpportunityDto: CreateOpportunityDto,
    @CurrentUser() organization: OrganizationEntity,
  ) {
    return this.opportunityService.create(
      createOpportunityDto,
      organization,
      imageFile,
    );
  }

  @ApiOperation({
    summary: 'Get opportunities by organization (Organization only)',
  })
  @ApiResponse({ status: 200, description: 'List of opportunities' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.SUPER_ADMIN)
  @Get()
  async findAllByOrganization(
    @CurrentUser() organization: OrganizationEntity,
    @Query() paginationDto: PaginationDto,
    @Query() filterDto?: FilterDto,
  ) {
    return this.opportunityService.findAllByOrganization(
      organization.id,
      paginationDto,
      filterDto,
    );
  }

  @ApiOperation({
    summary: 'Get paginated list of opportunities with filtering',
    description:
      'Returns a paginated list of opportunities with optional filtering capabilities.',
  })
  @ApiOkResponse({
    description: 'Paginated list of opportunities',
    type: OpportunityResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid filter parameters provided',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    example: 'Software',
  })
  @ApiQuery({
    name: 'location',
    required: false,
    type: String,
    example: 'New York',
  })
  @ApiQuery({ name: 'opportunityType', required: false, enum: OpportunityType })
  @ApiQuery({ name: 'experienceLevel', required: false, enum: ExperienceLevel })
  @ApiQuery({ name: 'category', required: false, enum: Category })
  @ApiQuery({ name: 'paymentType', required: false, enum: PaymentType })
  @ApiQuery({
    name: 'organizationId',
    required: false,
    type: String,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiQuery({
    name: 'createdAfter',
    required: false,
    type: String,
    example: '2023-01-01T00:00:00.000Z',
  })
  @ApiQuery({
    name: 'createdBefore',
    required: false,
    type: String,
    example: '2023-12-31T23:59:59.999Z',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    example: 'createdAt:desc',
  })
  @Public()
  @Get('all')
  async findAll(
    @Query() paginationDto: PaginationDto,
    @Query() filterDto?: OpportunityFilterDto,
  ) {
    return this.opportunityService.findAll(paginationDto, filterDto);
  }

  @ApiOperation({ summary: 'Update an opportunity (Organization only)' })
  @ApiResponse({ status: 200, description: 'Opportunity updated successfully' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.SUPER_ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  async update(
    @UploadedFile() imageFile: Express.Multer.File,
    @Param('id') id: string,
    @Body() createOpportunityDto: CreateOpportunityDto,
    @CurrentUser() organization: OrganizationEntity,
  ) {
    return this.opportunityService.update(
      id,
      createOpportunityDto,
      organization.id,
      imageFile,
    );
  }

  @ApiOperation({ summary: 'Delete an opportunity (Organization only)' })
  @ApiResponse({ status: 200, description: 'Opportunity deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Opportunity not found' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.SUPER_ADMIN)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @CurrentUser() organization: OrganizationEntity,
  ) {
    return this.opportunityService.delete(id, organization.id);
  }

  @ApiOperation({
    summary: 'Create a new opportunity (Organization & SUPER_ADMIN)',
  })
  @ApiResponse({ status: 201, description: 'Opportunity created successfully' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.SUPER_ADMIN, UserRoles.ORGANIZATION)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Post('byUser')
  async createByUser(
    @UploadedFile() imageFile: Express.Multer.File,
    @Body() createOpportunityDto: CreateOpportunityDto,
    @CurrentUser() user: OrganizationEntity,
  ) {
    return this.opportunityService.createByUser(
      createOpportunityDto,
      user,
      imageFile,
    );
  }

  @ApiOperation({
    summary: 'Update an opportunity (Organization & SUPER_ADMIN)',
  })
  @ApiResponse({ status: 200, description: 'Opportunity updated successfully' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.SUPER_ADMIN, UserRoles.ORGANIZATION)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @Patch('byUser/:id')
  async updateByUser(
    @UploadedFile() imageFile: Express.Multer.File,
    @Param('id') id: string,
    @Body() createOpportunityDto: CreateOpportunityDto,
    @CurrentUser() user: OrganizationEntity,
  ) {
    return this.opportunityService.updateByUser(
      id,
      createOpportunityDto,
      user,
      imageFile,
    );
  }

  @ApiOperation({
    summary: 'Delete an opportunity (Organization & SUPER_ADMIN)',
  })
  @ApiResponse({ status: 200, description: 'Opportunity deleted successfully' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.SUPER_ADMIN, UserRoles.ORGANIZATION)
  @Delete('byUser/:id')
  async deleteByUser(
    @Param('id') id: string,
    @CurrentUser() user: OrganizationEntity,
  ) {
    return this.opportunityService.deleteByUser(id, user);
  }

  @ApiOperation({
    summary: 'Get an opportunity by ID (Organization & SUPER_ADMIN)',
  })
  @ApiResponse({ status: 200, description: 'Opportunity found' })
  @ApiResponse({ status: 404, description: 'Opportunity not found' })
  @UseGuards(RolesGuard)
  @Get('byUser/:id')
  async getOpportunityById(
    @Param('id') id: string,
    @CurrentUser() user: OrganizationEntity,
  ) {
    return this.opportunityService.getById(id, user);
  }
}
