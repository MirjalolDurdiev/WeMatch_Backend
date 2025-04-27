import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillEntity } from 'src/core/entity';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { UserEntity } from 'src/core/entity';

@Injectable()
export class SkillService {
  constructor(
    @InjectRepository(SkillEntity)
    private readonly skillRepository: Repository<SkillEntity>,
  ) {}

  
  async create(
    createSkillDto: CreateSkillDto,
    user: UserEntity,
  ): Promise<SkillEntity> {
    const skill = this.skillRepository.create({
      ...createSkillDto,
      user,
    });

    return await this.skillRepository.save(skill);
  }


  async findAll(user: UserEntity): Promise<SkillEntity[]> {
    return await this.skillRepository.find({
      where: { user },
    });
  }

  async findOne(id: string, user: UserEntity): Promise<SkillEntity> {
    const skill = await this.skillRepository.findOne({
      where: { id, user },
    });

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    return skill;
  }

  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
    user: UserEntity,
  ): Promise<SkillEntity> {
    const skill = await this.findOne(id, user);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    const updatedSkill = await this.skillRepository.save({
      ...skill,
      ...updateSkillDto,
    });

    return updatedSkill;
  }

  async remove(id: string, user: UserEntity): Promise<void> {
    const skill = await this.findOne(id, user);

    if (!skill) {
      throw new NotFoundException('Skill not found');
    }

    await this.skillRepository.remove(skill);
  }

  async searchUsersBySkill(
    skillName: string,
  ): Promise<{ user: UserEntity; skill: Omit<SkillEntity, 'user'> }[]> {
    const skills = await this.skillRepository
      .createQueryBuilder('skill')
      .leftJoinAndSelect('skill.user', 'user')
      .where('skill.skill_name ILIKE :skillName', {
        skillName: `%${skillName}%`,
      })
      .getMany();

    return skills.map((skill) => {
      const { user, ...skillWithoutUser } = skill; 
      return { user, skill: skillWithoutUser };
    });
  }
}
