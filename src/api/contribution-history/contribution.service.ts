import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContributionDto } from './dto/create-contribution.dto';
import { UpdateContributionDto } from './dto/update-contribution.dto';
import { ContributionEntity, UserEntity } from 'src/core/entity';

@Injectable()
export class ContributionService {
  constructor(
    @InjectRepository(ContributionEntity)
    private readonly contributionRepo: Repository<ContributionEntity>,
  ) { }

  async create(dto: CreateContributionDto, user: UserEntity) {
    const contribution = this.contributionRepo.create({ ...dto, user });
    await this.contributionRepo.save(contribution);
    return { status: 201, data: contribution, message: 'Contribution successfully created' };
  }

  async findAll(user: UserEntity) {
    const contributions = await this.contributionRepo.find({ where: { user, is_deleted: false } });
    return { status: 200, data: contributions, message: 'Contributions fetched successfully' };
  }

  async findOne(id: string, user: UserEntity) {
    const contribution = await this.contributionRepo.findOne({ where: { id, user } });
    if (!contribution) throw new NotFoundException('Contribution not found');
    return { status: 200, data: contribution, message: 'Contribution fetched successfully' };
  }

  async update(id: string, dto: UpdateContributionDto, user: UserEntity) {
    const contribution = await this.contributionRepo.findOne({ where: { id, user } });
    if (!contribution) throw new NotFoundException('Contribution not found');

    Object.assign(contribution, dto);
    await this.contributionRepo.save(contribution);
    return { status: 200, data: contribution, message: 'Contribution updated successfully' };
  }

  async remove(id: string, user: UserEntity) {
    const contribution = await this.contributionRepo.findOne({ where: { id, user } });
    if (!contribution) throw new NotFoundException('Contribution not found');


    contribution.deleted_at = new Date();
    contribution.deleted_by = user.id;
    contribution.is_deleted = true;

    await this.contributionRepo.save(contribution)
    return { status: 200, data: null, message: 'Contribution successfully soft-deleted' };

  }
}