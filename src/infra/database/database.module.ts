import { Module } from '@nestjs/common';
import { UserRepository } from '@application/repositories/user-repository';
import { VehicleRepository } from '@application/repositories/vehicle-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-user-repository';
import { PrismaVehicleRepository } from './prisma/repositories/prisma-vehicle-repository';
import { RedisCacheService } from './redis/redis.service';
import Redis from 'ioredis';

@Module({
  providers: [
    PrismaService,
    RedisCacheService,
    Redis,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: VehicleRepository,
      useClass: PrismaVehicleRepository,
    },
  ],
  exports: [UserRepository, VehicleRepository, RedisCacheService],
})
export class DatabaseModule { }
