import { Module } from '@nestjs/common';
import { SkillService } from './skill.service';
import { SkillController } from './skill.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillEntity, UserEntity } from 'src/core/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillEntity, UserEntity])
  ],
  controllers: [SkillController],
  providers: [SkillService],
})
export class SkillModule { }
