import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule as NestRedisModule } from '@nestjs-modules/ioredis';
import { RedisCacheService } from './redis.service';
import { config } from 'src/config';

@Module({
    imports: [
        ConfigModule,
        NestRedisModule.forRoot({ 
            type: 'single',
            url: config.REDIS_URL,
            ...(config.REDIS_URL.startsWith('rediss://') && { tls: {} }), // TLS faqat `rediss://` bo‘lsa qo‘shiladi
        }),
    ],
    providers: [RedisCacheService],
    exports: [RedisCacheService],
})
export class RedisModule { }
