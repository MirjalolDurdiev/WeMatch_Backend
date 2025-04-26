import { Module } from '@nestjs/common';
import { OpportunityService } from './opportunity.service';
import { OpportunityController } from './opportunity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ApplicationEntity,
  OpportunityEntity,
  OrganizationEntity,
} from 'src/core/entity';
import { QueryHelperService } from 'src/infrastructure/query/query-helper';
import { FileService } from 'src/infrastructure/file';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OpportunityEntity,
      ApplicationEntity,
      OrganizationEntity,
    ]),
  ],
  controllers: [OpportunityController],
  providers: [OpportunityService, QueryHelperService, FileService],
})
export class OpportunityModule {}
