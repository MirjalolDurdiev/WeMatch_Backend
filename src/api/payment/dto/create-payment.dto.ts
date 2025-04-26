import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { PaymentStatus } from 'src/common/database/Enum';

export class CreatePaymentDto {
    @IsUUID()
    @IsNotEmpty()
    organizationId: string;

    @IsUUID()
    @IsNotEmpty()
    subscriptionId: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}

export class UpdatePaymentDto {
    @IsEnum(PaymentStatus)
    @IsNotEmpty()
    status: PaymentStatus;
}
