import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityEntity, OrganizationEntity, UserEntity } from 'src/core/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationEntity, UserEntity, OpportunityEntity])
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule { }
