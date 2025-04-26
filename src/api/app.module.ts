import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config';
import { ApplicationEntity, CertificateEntity, ContributionEntity, EducationEntity, OpportunityEntity, OrganizationEntity, SkillEntity, SubscriptionEntity, UserEntity } from 'src/core/entity';
import { AuthModule } from './auth/auth.module';
import { MailModule } from 'src/infrastructure/mail/mail.module';
import { UserModule } from './user/user.module';
import { JwtStrategy } from './auth/users/AuthStrategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/users/AuthGuard';
import { CertificateModule } from './certificate/certificate.module';
import { EducationModule } from './education/education.module';
import { OrganizationModule } from './organization/organization.module';
import { SkillModule } from './skill/skill.module';
import { ApplicationModule } from './application/application.module';
import { OpportunityModule } from './opportunity/opportunity.module';
import { ContributionHistoryModule } from './contribution-history/contribution.module';
import { PaymentEntity } from 'src/core/entity/payment.entity';
// import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URL,
      synchronize: true,
      entities: [UserEntity, ApplicationEntity, CertificateEntity, ContributionEntity, EducationEntity, OpportunityEntity, OrganizationEntity, SkillEntity, SubscriptionEntity, PaymentEntity],
      ssl: false
    }),
    AuthModule,
    MailModule,
    UserModule,
    CertificateModule, 
    EducationModule,
    OrganizationModule,
    SkillModule,
    ApplicationModule,
    OpportunityModule,
    ContributionHistoryModule,
    // PaymentModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
