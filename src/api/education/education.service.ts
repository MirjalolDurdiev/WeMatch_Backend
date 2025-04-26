import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EducationEntity } from 'src/core/entity';
import { CreateEducationDto } from './dto/create-education.dto';
import { UpdateEducationDto } from './dto/update-education.dto';
import { UserEntity } from 'src/core/entity';

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationEntity)
    private readonly educationRepository: Repository<EducationEntity>,
  ) {}

  async create(
    createEducationDto: CreateEducationDto,
    user: UserEntity,
  ): Promise<EducationEntity> {
    try {
      const education = this.educationRepository.create({
        ...createEducationDto,
        user,
      });
      console.log('education', education);
      console.log('createEducationDto', createEducationDto);
      return await this.educationRepository.save(education);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create education record',
      );
    }
  }

  async findAll(user: UserEntity): Promise<EducationEntity[]> {
    try {
      return await this.educationRepository.find({ where: { user } });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve education records',
      );
    }
  }

  async findOne(id: string, user: UserEntity): Promise<EducationEntity> {
    try {
      const education = await this.educationRepository.findOne({
        where: { id, user },
      });
      if (!education) {
        throw new NotFoundException('Education not found');
      }
      return education;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to retrieve education record',
      );
    }
  }

  async update(
    id: string,
    updateEducationDto: UpdateEducationDto,
    user: UserEntity,
  ): Promise<EducationEntity> {
    try {
      const education = await this.findOne(id, user);
      if (!education) {
        throw new NotFoundException('Education not found');
      }
      const updatedEducation = await this.educationRepository.save({
        ...education,
        ...updateEducationDto,
      });
      return updatedEducation;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to update education record',
      );
    }
  }

  async remove(id: string, user: UserEntity): Promise<void> {
    try {
      const education = await this.educationRepository.findOne({
        where: { id, user },
      });
      if (!education) {
        throw new NotFoundException('Education not found');
      }
      await this.educationRepository.remove(education);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to delete education record',
      );
    }
  }
}
