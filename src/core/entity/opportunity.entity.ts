import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { Category, ExperienceLevel, OpportunityType, PaymentType } from 'src/common/database/Enum';


@Entity()
export class OpportunityEntity extends BaseEntity {

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ length: 255 })
  location: string;

  @Column({ type: 'enum', enum: OpportunityType })
  opportunityType: OpportunityType;

  @Column({ type: 'enum', enum: ExperienceLevel })
  experienceLevel: ExperienceLevel;

  @Column({ type: 'enum', enum: Category })
  category: Category;

  @Column({ type: 'enum', enum: PaymentType, default: PaymentType.UNPAID })
  paymentType: PaymentType;

  @Column({ type: 'varchar', nullable: true })
  image: string

  @ManyToOne(() => OrganizationEntity, (organization) => organization.opportunities, {
    onDelete: 'CASCADE',
    nullable: true
  })
  organization?: OrganizationEntity;
}
