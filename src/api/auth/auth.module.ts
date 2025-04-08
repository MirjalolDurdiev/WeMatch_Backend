import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity/user.entity';
import { config } from 'src/config';
import { BcryptEncryption } from 'src/infrastructure/bcrypt';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { CustomMailerService } from 'src/infrastructure/mail/mail.service';
import { OrganizationEntity } from 'src/core/entity';
import { OrganizationService } from '../organization/organization.service';
import { OrganizationModule } from '../organization/organization.module';
import { RedisCacheService } from 'src/infrastructure/redis/redis.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, OrganizationEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.ACCESS_TOKEN_SECRET_KEY,
      signOptions: { expiresIn: config.ACCESS_TOKEN_EXPIRED_TIME },
    }),
    RedisModule,
    OrganizationModule
  ],
  providers: [AuthService, BcryptEncryption, CustomMailerService, RedisCacheService],
  controllers: [AuthController],
})
export class AuthModule { } 
