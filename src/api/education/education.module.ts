import { Module } from '@nestjs/common';
import { EducationService } from './education.service';
import { EducationController } from './education.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationEntity, UserEntity } from 'src/core/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EducationEntity, UserEntity])
  ],
  controllers: [EducationController],
  providers: [EducationService],
})
export class EducationModule { }
