import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { CurrentUser } from 'src/common/decorator/current-user';
import { UserEntity } from 'src/core/entity';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles/RoleGuard';
import { UserRoles } from 'src/common/database/Enum';
import { RolesDecorator } from '../auth/roles/RolesDecorator';

@ApiTags('Skills')
@ApiBearerAuth('access-token')
@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @ApiOperation({ summary: 'Create a new skill' })
  @ApiResponse({ status: 201, description: 'Skill created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @Post()
  async create(
    @Body() createSkillDto: CreateSkillDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.skillService.create(createSkillDto, user);
  }

  @ApiOperation({ summary: 'Get all skills of a user' })
  @ApiResponse({ status: 200, description: 'List of skills' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @Get()
  async findAll(@CurrentUser() user: UserEntity) {
    console.log(user);
    return this.skillService.findAll(user);
  }

  @ApiOperation({ summary: 'Get a specific skill by ID' })
  @ApiResponse({ status: 200, description: 'Skill found' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.skillService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Update an existing skill' })
  @ApiResponse({ status: 200, description: 'Skill updated successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.skillService.update(id, updateSkillDto, user);
  }

  @ApiOperation({ summary: 'Delete a skill' })
  @ApiResponse({ status: 200, description: 'Skill deleted successfully' })
  @ApiResponse({ status: 404, description: 'Skill not found' })
  @Delete(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.skillService.remove(id, user);
  }

  @ApiOperation({ summary: 'Search users by skill name' })
  @ApiResponse({ status: 200, description: 'List of users with the skill' })
  @Get('search/:skillName')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  async searchUsers(@Param('skillName') skillName: string) {
    return this.skillService.searchUsersBySkill(skillName);
  }
}
