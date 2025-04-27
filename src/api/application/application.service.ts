import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationEntity } from 'src/core/entity/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { UserEntity } from 'src/core/entity/user.entity';
import { OpportunityEntity } from 'src/core/entity/opportunity.entity';
import { ApplicationStatus } from 'src/common/database/Enum';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private readonly applicationRepository: Repository<ApplicationEntity>,
    @InjectRepository(OpportunityEntity)
    private readonly opportunityRepository: Repository<OpportunityEntity>,
  ) { }

  async create(createApplicationDto: CreateApplicationDto, user: UserEntity): Promise<ApplicationEntity> {
    const opportunity = await this.opportunityRepository.findOne({
      where: { id: createApplicationDto.opportunityId }
    });

    if (!opportunity) {
      throw new NotFoundException('Opportunity not found');
    }

    const application = this.applicationRepository.create({
      user,
      opportunity,
      status: ApplicationStatus.PENDING,
    });

    return await this.applicationRepository.save(application);
  }
  async updateStatus(id: string, updateApplicationDto: UpdateApplicationDto, organizationId: string): Promise<ApplicationEntity> {
    const application = await this.applicationRepository.findOne({
      where: { id },
      relations: ['opportunity'],
    });

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (application.opportunity.organization.id !== organizationId) {
      throw new ForbiddenException('You are not allowed to update this application');
    }

    application.status = updateApplicationDto.status;
    return await this.applicationRepository.save(application);
  }
}
