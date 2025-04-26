import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { SkillLevel } from 'src/common/database/Enum';

@Entity()
export class SkillEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.skills, { onDelete: 'CASCADE' })
  user: UserEntity;

  @Column({ length: 255 })
  skill_name: string;

  @Column({ enum: SkillLevel, default: SkillLevel.INTERMEDIATE })
  level: SkillLevel;
}
