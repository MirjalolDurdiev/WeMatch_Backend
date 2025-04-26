import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/database/BaseEntity';
import { OpportunityEntity } from './opportunity.entity';
import { SubscriptionStatus } from 'src/common/database/Enum';
import { PaymentEntity } from './payment.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity()
export class OrganizationEntity extends BaseEntity {

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    password: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ length: 255, nullable: true })
    website: string;

    @Column({ length: 255, nullable: true })
    industry: string;

    @Column({ type: 'enum', enum: SubscriptionStatus, default: SubscriptionStatus.PENDING })
    subscriptionStatus: SubscriptionStatus;

    @OneToMany(() => OpportunityEntity, (opportunity) => opportunity.organization)
    opportunities: OpportunityEntity[];

    @OneToMany(() => PaymentEntity, (payment) => payment.organization, { eager: true })
    payments: PaymentEntity[];

    @OneToMany(() => SubscriptionEntity, (subscription) => subscription.organization, { eager: true })
    subscriptions: SubscriptionEntity[];
}
