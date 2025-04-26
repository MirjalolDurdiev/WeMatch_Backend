import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { OpportunityEntity } from './opportunity.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { ApplicationStatus } from 'src/common/database/Enum';

@Entity()
export class ApplicationEntity extends BaseEntity {

  @ManyToOne(() => UserEntity, (user) => user.applications, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => OpportunityEntity, { onDelete: 'CASCADE' })
  opportunity: OpportunityEntity;

  @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.PENDING })
  status: ApplicationStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  applied_at: Date;
}
