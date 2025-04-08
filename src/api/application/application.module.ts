import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationEntity, OpportunityEntity, UserEntity } from 'src/core/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationEntity, OpportunityEntity, UserEntity])
  ],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule { }
