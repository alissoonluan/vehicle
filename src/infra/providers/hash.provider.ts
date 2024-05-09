import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HashProvider {
  async createHash(plaintext: string): Promise<string> {
    const saltRounds = 12;
    return hash(plaintext, saltRounds);
  }

  async compareHash(plaintext: string, digest: string): Promise<boolean> {
    return compare(plaintext, digest);
  }
}
