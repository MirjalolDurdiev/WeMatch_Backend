import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity';
import { FileService } from 'src/infrastructure/file';
import { QueryHelperService } from 'src/infrastructure/query/query-helper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, FileService, QueryHelperService],
})
export class UserModule { }
