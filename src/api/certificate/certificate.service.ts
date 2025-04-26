import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CertificateEntity } from 'src/core/entity';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { UserEntity } from 'src/core/entity';
import { FileService } from 'src/infrastructure/file';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(CertificateEntity)
    private readonly certificateRepository: Repository<CertificateEntity>,
    private readonly fileService: FileService,
  ) { }

  async create(
    createCertificateDto: CreateCertificateDto,
    user: UserEntity,
    file?: Express.Multer.File,
  ): Promise<CertificateEntity> {
    let imageUrl = null;
    if (file) {
      imageUrl = await this.fileService.saveFile(file);
    }
    const certificate = this.certificateRepository.create({
      ...createCertificateDto,
      user,
      image: imageUrl,
    });
    return await this.certificateRepository.save(certificate);
  }

  async findAll(user: UserEntity): Promise<CertificateEntity[]> {
    return await this.certificateRepository.find({ where: { user } });
  }

  async findOne(id: string, user: UserEntity): Promise<CertificateEntity> {
    const certificate = await this.certificateRepository.findOne({ where: { id, user } });
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    return certificate;
  }

  async update(
    id: string,
    updateCertificateDto: UpdateCertificateDto,
    user: UserEntity,
    file?: Express.Multer.File,
  ): Promise<CertificateEntity> {
    const certificate = await this.findOne(id, user);
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    if (file) {
      if (certificate.image) {
        console.log(certificate.image)
        await this.fileService.deleteFile(certificate.image);
      }
      certificate.image = await this.fileService.saveFile(file);
    }

    Object.assign(certificate, updateCertificateDto);
    return await this.certificateRepository.save(certificate);
  }

  async remove(id: string, user: UserEntity): Promise<void> {
    const certificate = await this.findOne(id, user);
    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }
    if (certificate.image) {
      await this.fileService.deleteFile(certificate.image);
    }
    await this.certificateRepository.remove(certificate);
  }
}
