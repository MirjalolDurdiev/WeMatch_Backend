import { Injectable, NotFoundException, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from 'src/core/entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { UserEntity } from 'src/core/entity/user.entity';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto, currentUserId: string): Promise<any> {
    try {
      const org = await this.organizationRepository.findOne({ where: { email: createOrganizationDto.email, is_deleted: false } })
      const user = await this.userRepository.findOne({ where: { id: currentUserId, is_deleted: false } });

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (!org) {
        throw new ConflictException("Email already registered.");
      }

      const password = await BcryptEncryption.encrypt(createOrganizationDto.password)
      const organization = this.organizationRepository.create({ ...createOrganizationDto, password });
      organization.created_by = currentUserId;

      await this.organizationRepository.save(organization);

      return { status: 201, data: organization, message: 'Organization successfully created' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto, currentUserId: string): Promise<any> {
    try {
      const organization = await this.organizationRepository.findOne({ where: { id } });

      if (!organization) {
        throw new NotFoundException('Organization not found');
      }

      await this.organizationRepository.update(id, {
        ...updateOrganizationDto,
        updated_by: currentUserId,
      });

      const updatedOrganization = await this.organizationRepository.findOne({ where: { id } });

      console.log(`${currentUserId} updated organization: ${updatedOrganization.name}`);

      return { status: 200, data: updatedOrganization, message: 'Organization successfully updated' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string, currentUserId: string): Promise<any> {
    try {
      const organization = await this.organizationRepository.findOne({ where: { id } });

      if (!organization) {
        throw new NotFoundException('Organization not found');
      }

      organization.deleted_at = new Date();
      organization.deleted_by = currentUserId;
      organization.is_deleted = true;

      await this.organizationRepository.save(organization);

      console.log(`${currentUserId} soft-deleted organization: ${organization.name}`);

      return { status: 200, data: null, message: 'Organization successfully soft-deleted' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const organization = await this.organizationRepository.findOne({ where: { id } });
      if (!organization) {
        throw new NotFoundException('Organization not found');
      }
      return { status: 200, data: organization, message: 'Organization retrieved successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<any> {
    try {
      const organizations = await this.organizationRepository.find();
      return { status: 200, data: organizations, message: 'Organizations retrieved successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
