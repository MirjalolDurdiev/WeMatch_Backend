import { Column, Entity, ManyToOne } from 'typeorm';
import { OrganizationEntity } from './organization.entity';
import { PaymentStatus } from 'src/common/database/Enum';
import { SubscriptionEntity } from './subscription.entity';
import { BaseEntity } from 'src/common/database/BaseEntity';

@Entity('payment')
export class PaymentEntity extends BaseEntity {
    @ManyToOne(() => OrganizationEntity, (organization) => organization.payments)
    organization: OrganizationEntity;

    @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.payments, { eager: true })
    subscription: SubscriptionEntity;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus;
}
