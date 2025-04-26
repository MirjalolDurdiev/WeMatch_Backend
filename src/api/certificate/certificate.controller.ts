import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { CurrentUser } from 'src/common/decorator/current-user';
import { UserEntity } from 'src/core/entity';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRoles } from 'src/common/database/Enum';
import { RolesGuard } from '../auth/roles/RoleGuard';
import { RolesDecorator } from '../auth/roles/RolesDecorator';

@ApiBearerAuth('access-token')
@ApiTags('Certificates')
@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) { }

  @Post()
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Yangi sertifikat yaratish' })
  async create(
    @Body() createCertificateDto: CreateCertificateDto,
    @UploadedFile() image: Express.Multer.File,
    @CurrentUser() user: UserEntity,
  ) {
    return this.certificateService.create(createCertificateDto, user, image);
  }

  @Get()
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @ApiOperation({ summary: 'Foydalanuvchining barcha sertifikatlarini olish' })
  @ApiResponse({ status: 200, description: 'Sertifikatlar ro‘yxati' })
  async findAll(@CurrentUser() user: UserEntity) {
    return this.certificateService.findAll(user);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @ApiOperation({ summary: 'Bitta sertifikatni olish' })
  @ApiResponse({ status: 200, description: 'Topilgan sertifikat' })
  @ApiResponse({ status: 404, description: 'Sertifikat topilmadi' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: UserEntity,
  ) {
    return this.certificateService.findOne(id, user);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Sertifikatni yangilash' })
  async update(
    @Param('id') id: string,
    @Body() updateCertificateDto: UpdateCertificateDto,
    @UploadedFile() image: Express.Multer.File,
    @CurrentUser() user: UserEntity,
  ) {
    return this.certificateService.update(id, updateCertificateDto, user, image);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @RolesDecorator(UserRoles.USER)
  @ApiOperation({ summary: 'Sertifikatni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Sertifikat muvaffaqiyatli o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Sertifikat topilmadi' })
  async remove(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.certificateService.remove(id, user);
  }
}
