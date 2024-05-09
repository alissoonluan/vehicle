import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeRedisService {
  private readonly data: Record<string, string> = {};

  async set(
    key: string,
    value: string,
    mode?: string,
    ttl?: number,
  ): Promise<void> {
    this.data[key] = value;
    if (mode === 'EX' && ttl) {
      setTimeout(() => {
        delete this.data[key];
      }, ttl * 1000);
    }
  }

  async get(key: string): Promise<string | null> {
    return this.data[key] || null;
  }
}
