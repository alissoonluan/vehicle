import { Injectable } from '@nestjs/common';
import { FakeRedisService } from './fake-redis-service';
import { RedisServiceInterface } from '../../src/infra/database/redis/redis.service';

@Injectable()
export class FakeRedisCacheService implements RedisServiceInterface {
  constructor(private readonly fakeRedisService: FakeRedisService) { }

  async setToken(key: string, value: string): Promise<void> {
    this.fakeRedisService.set(key, value);
  }

  async getToken(key: string): Promise<string | null> {
    return this.fakeRedisService.get(key) ?? null;
  }
}
