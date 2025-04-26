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
import { EducationService } from './education.service';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { CurrentUser } from 'src/common/decorator/current-user';
import { UserEntity } from 'src/core/entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles/RoleGuard';
import { RolesDecorator } from '../auth/roles/RolesDecorator';
import { UserRoles } from 'src/common/database/Enum';

@ApiBearerAuth('access-token')
@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) { }

  @Post()
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  async create(
    @Body() createEducationDto: CreateEducationDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.educationService.create(createEducationDto, user);
  }

  @Get()
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  async findAll(@CurrentUser() user: UserEntity) {
    return this.educationService.findAll(user);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.educationService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  async update(
    @Param('id') id: string,
    @Body() updateEducationDto: UpdateEducationDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.educationService.update(id, updateEducationDto, user);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.educationService.remove(id, user);
  }
}
