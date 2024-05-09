import { Injectable } from '@nestjs/common';
import { FakeJwtService } from './fake-jwt-service';
import { JwtServiceInterface } from '../../src/infra/providers/jwt.provider';

@Injectable()
export class FakeJwtProvider implements JwtServiceInterface {
  constructor(private readonly fakeJwtService: FakeJwtService) { }

  async encryptToken(plaintext: Record<string, any>): Promise<string> {
    return this.fakeJwtService.sign({ ...plaintext });
  }

  async decryptToken(ciphertext: string): Promise<any> {
    return this.fakeJwtService.verify(ciphertext);
  }

  async getExpirationDuration(token: string): Promise<number> {
    const SECONDS_TO_MILLISECONDS = 1000;
    const decoded = await this.decryptToken(token);
    return decoded.exp - Math.floor(Date.now() / SECONDS_TO_MILLISECONDS);
  }
}
