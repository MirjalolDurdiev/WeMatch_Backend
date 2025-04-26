import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { PaymentEntity } from './payment.entity';

export enum SubscriptionStatus {
    ACTIVE = 'active',
    REJECTED = 'rejected',
    PENDING = 'pending',
}

@Entity({ name: 'subscriptions' })
export class SubscriptionEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => OrganizationEntity, (organization) => organization.subscriptions, {
        onDelete: 'CASCADE',
    })
    organization: OrganizationEntity;

    @ManyToOne(() => PaymentEntity, (payment) => payment.subscription, {
        onDelete: 'CASCADE',
    })
    payments: PaymentEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'int' })
    count: number;

    @Column({
        type: 'enum',
        enum: SubscriptionStatus,
        default: SubscriptionStatus.ACTIVE,
    })
    status: SubscriptionStatus;
}
