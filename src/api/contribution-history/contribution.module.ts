import { Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContributionEntity } from 'src/core/entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContributionEntity])],
  controllers: [ContributionController],
  providers: [ContributionService],
})
export class ContributionHistoryModule { }
