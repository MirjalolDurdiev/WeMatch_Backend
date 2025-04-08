import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { OrganizationEntity, SubscriptionEntity } from 'src/core/entity';
import { PaymentEntity } from 'src/core/entity/payment.entity';
import { PaymentStatus } from 'src/common/database/Enum';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity) private paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(OrganizationEntity) private organizationRepository: Repository<OrganizationEntity>,
    @InjectRepository(SubscriptionEntity) private subscriptionRepository: Repository<SubscriptionEntity>,
  ) { }

  async create(dto: CreatePaymentDto): Promise<PaymentEntity> {
    const organization = await this.organizationRepository.findOne({ where: { id: dto.organizationId } });
    if (!organization) throw new NotFoundException('Organization not found');

    const subscription = await this.subscriptionRepository.findOne({ where: { id: dto.subscriptionId } });
    if (!subscription) throw new NotFoundException('Subscription not found');

    const payment = this.paymentRepository.create({
      organization,
      subscription,
      amount: dto.amount,
      status: PaymentStatus.PENDING,
    });

    return await this.paymentRepository.save(payment);
  }

  async findAll(): Promise<PaymentEntity[]> {
    return await this.paymentRepository.find();
  }

  async findOne(id: string): Promise<PaymentEntity> {
    const payment = await this.paymentRepository.findOne({
      where: { id } as FindOptionsWhere<PaymentEntity>,
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<PaymentEntity> {
    const payment = await this.findOne(id);
    payment.status = dto.status;
    return await this.paymentRepository.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }
}
