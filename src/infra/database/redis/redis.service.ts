import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

export interface RedisServiceInterface {
  setToken(key: string, value: string, ttl: number): Promise<void>;
  getToken(key: string): Promise<string | null>;
  redis?: Redis;
}

@Injectable()
export class RedisCacheService implements RedisServiceInterface {
  constructor(public readonly redis?: Redis) { }

  async setToken(key: string, value: string, ttl: number): Promise<void> {
    await this.redis.set(key, value, 'EX', ttl);
  }

  async getToken(key: string): Promise<string | null> {
    return this.redis.get(key);
  }
}
