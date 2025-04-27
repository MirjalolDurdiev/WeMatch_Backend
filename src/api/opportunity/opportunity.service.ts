import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { OpportunityEntity } from 'src/core/entity/opportunity.entity';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { OrganizationEntity } from 'src/core/entity/organization.entity';
import { FilterDto } from 'src/infrastructure/query/dto/filter.dto';
import { PaginationDto } from 'src/infrastructure/query/dto/pagination.dto';
import { QueryHelperService } from 'src/infrastructure/query/query-helper';
import { FileService } from 'src/infrastructure/file';
import { UserRoles } from 'src/common/database/Enum';
import { OpportunitySortDto } from 'src/infrastructure/query/dto/opportunity-sort.dto';
import { OpportunityFilterDto } from 'src/infrastructure/query/dto/opportunity-filter.dto';

@Injectable()
export class OpportunityService {
  constructor(
    @InjectRepository(OpportunityEntity)
    private readonly opportunityRepository: Repository<OpportunityEntity>,
    @InjectRepository(OrganizationEntity)
    private readonly organizationRepository: Repository<OrganizationEntity>,
    private readonly fileService: FileService,
  ) {}

  async create(
    createOpportunityDto: CreateOpportunityDto,
    organization: OrganizationEntity,
    imageFile?: Express.Multer.File,
  ): Promise<OpportunityEntity> {
    const org = await this.organizationRepository.findOne({
      where: { id: organization.id },
    });

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    let imageFileName: string | null = null;

    if (imageFile) {
      imageFileName = await this.fileService.saveFile(imageFile);
    }

    const opportunity = this.opportunityRepository.create({
      ...createOpportunityDto,
      organization,
      image: imageFileName,
    });

    return await this.opportunityRepository.save(opportunity);
  }

  async findAllByOrganization(
    organizationId: string,
    paginationDto: PaginationDto,
    filterDto?: FilterDto,
  ): Promise<any> {
    const queryBuilder = this.opportunityRepository
      .createQueryBuilder('opportunity')
      .where('opportunity.organizationId = :organizationId', {
        organizationId,
      });

    const searchFields = ['opportunity.title', 'opportunity.description'];

    return await QueryHelperService.paginateAndFilter(
      queryBuilder,
      paginationDto,
      filterDto,
      searchFields,
    );
  }
  async findAll(
    pagination?: PaginationDto,
    filter?: OpportunityFilterDto,
    sort?: OpportunitySortDto,
  ) {
    // Build where clause for filtering
    const where: FindOptionsWhere<OpportunityEntity> = {};

    if (filter) {
      if (filter.name) where.name = Like(`%${filter.name}%`);
      if (filter.location) where.location = Like(`%${filter.location}%`);

      if (filter.opportunityType) {
        where.opportunityType = In(
          Array.isArray(filter.opportunityType)
            ? filter.opportunityType
            : [filter.opportunityType],
        );
      }

      if (filter.experienceLevel) {
        where.experienceLevel = In(
          Array.isArray(filter.experienceLevel)
            ? filter.experienceLevel
            : [filter.experienceLevel],
        );
      }

      if (filter.category) {
        where.category = In(
          Array.isArray(filter.category) ? filter.category : [filter.category],
        );
      }

      if (filter.paymentType) {
        where.paymentType = In(
          Array.isArray(filter.paymentType)
            ? filter.paymentType
            : [filter.paymentType],
        );
      }

      if (filter.organizationId) {
        where.organization = { id: filter.organizationId };
      }

      if (filter.createdAfter) {
        where.created_at = MoreThanOrEqual(new Date(filter.createdAfter));
      }

      if (filter.createdBefore) {
        where.created_at = LessThanOrEqual(new Date(filter.createdBefore));
      }

      if (filter.updatedAfter) {
        where.updated_at = MoreThanOrEqual(new Date(filter.updatedAfter));
      }

      if (filter.updatedBefore) {
        where.updated_at = LessThanOrEqual(new Date(filter.updatedBefore));
      }
    }

    // Build order clause for sorting
    let order = {};
    if (sort) {
      Object.entries(sort).forEach(([key, value]) => {
        if (value === 'asc' || value === 'desc') {
          order[key] = value;
        }
      });
    } else {
      // Default sorting
      order = { created_at: 'desc' };
    }

    // Handle pagination
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const [data, total] = await this.opportunityRepository.findAndCount({
      where,
      order,
      skip,
      take: limit,
      relations: ['organization'],
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async update(
    id: string,
    createOpportunityDto: CreateOpportunityDto,
    organizationId: string,
    imageFile: Express.Multer.File,
  ): Promise<OpportunityEntity> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id, organization: { id: organizationId } },
      relations: ['organization'],
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    if (opportunity.organization.id !== organizationId) {
      throw new ForbiddenException(
        'You are not allowed to update this opportunity',
      );
    }

    let imageFileName = opportunity.image;

    if (imageFile) {
      if (opportunity.image) {
        await this.fileService.deleteFile(opportunity.image);
      }

      imageFileName = await this.fileService.saveFile(imageFile);
    }

    Object.assign(opportunity, createOpportunityDto, { image: imageFileName });

    return await this.opportunityRepository.save(opportunity);
  }

  async delete(id: string, organizationId: string): Promise<void> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id, organization: { id: organizationId } },
      relations: ['organization'],
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    opportunity.deleted_at = new Date();
    opportunity.deleted_by = organizationId;
    opportunity.is_deleted = true;

    await this.organizationRepository.save(opportunity);

    await this.opportunityRepository.remove(opportunity);
  }

  // admin boshqaradigan qism
  async createByUser(
    createOpportunityDto: CreateOpportunityDto,
    user: any, // Organization yoki SUPER_ADMIN
    imageFile?: Express.Multer.File,
  ): Promise<OpportunityEntity> {
    let organization = null;
    if (user.role === UserRoles.SUPER_ADMIN) {
      // Agar user SUPER_ADMIN bo'lsa, organization bo'lmaydi, lekin yaratish mumkin
    } else {
      organization = await this.organizationRepository.findOne({
        where: { id: user.id },
      });
      if (!organization) {
        throw new NotFoundException('Organization not found');
      }
    }

    let imageFileName: string | null = null;
    if (imageFile) {
      imageFileName = await this.fileService.saveFile(imageFile);
    }

    const opportunity = this.opportunityRepository.create({
      ...createOpportunityDto,
      organization,
      image: imageFileName,
    });

    return await this.opportunityRepository.save(opportunity);
  }

  async updateByUser(
    id: string,
    createOpportunityDto: CreateOpportunityDto,
    user: any,
    imageFile: Express.Multer.File,
  ): Promise<OpportunityEntity> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    if (
      user.role !== UserRoles.SUPER_ADMIN &&
      opportunity.organization.id !== user.id
    ) {
      throw new ForbiddenException(
        'You are not allowed to update this opportunity',
      );
    }

    let imageFileName = opportunity.image;

    if (imageFile) {
      if (opportunity.image) {
        await this.fileService.deleteFile(opportunity.image);
      }
      imageFileName = await this.fileService.saveFile(imageFile);
    }

    Object.assign(opportunity, createOpportunityDto, { image: imageFileName });

    return await this.opportunityRepository.save(opportunity);
  }

  async deleteByUser(id: string, user: any): Promise<void> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    if (
      user.role !== UserRoles.SUPER_ADMIN &&
      opportunity.organization.id !== user.id
    ) {
      throw new ForbiddenException(
        'You are not allowed to delete this opportunity',
      );
    }

    opportunity.deleted_at = new Date();
    opportunity.deleted_by = user.id;
    opportunity.is_deleted = true;

    await this.opportunityRepository.remove(opportunity);
  }
  async getById(id: string, user: any): Promise<OpportunityEntity> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id },
      relations: ['organization'],
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

  

    return opportunity;
  }
}
