import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { CurrentUser } from 'src/common/decorator/current-user';
import { UserEntity } from 'src/core/entity';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Contribution History')
@ApiBearerAuth('access-token')
@Controller('contribution-history')
export class ContributionController {
  constructor(private readonly ContributionService: ContributionService) {}

  @ApiOperation({ summary: 'Create a new contribution record' })
  @ApiResponse({ status: 201, description: 'Contribution record created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  async create(
    @Body() CreateContributionDto: CreateContributionDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ContributionService.create(CreateContributionDto, user);
  }

  @ApiOperation({ summary: 'Get all contribution records of a user' })
  @ApiResponse({ status: 200, description: 'List of contribution records' })
  @Get()
  async findAll(@CurrentUser() user: UserEntity) {
    return this.ContributionService.findAll(user);
  }

  @ApiOperation({ summary: 'Get a specific contribution record by ID' })
  @ApiResponse({ status: 200, description: 'Contribution record found' })
  @ApiResponse({ status: 404, description: 'Contribution record not found' })
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ContributionService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update an existing contribution record' })
  @ApiResponse({ status: 200, description: 'Contribution record updated successfully' })
  @ApiResponse({ status: 404, description: 'Contribution record not found' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateContributionHistoryDto: UpdateContributionDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ContributionService.update(id, updateContributionHistoryDto, user);
  }

  @ApiOperation({ summary: 'Delete a contribution record' })
  @ApiResponse({ status: 200, description: 'Contribution record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Contribution record not found' })
  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.ContributionService.remove(id, user);
  }
}
