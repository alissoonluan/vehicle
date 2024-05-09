import { Injectable } from '@nestjs/common';

@Injectable()
export class FakeHashProvider {
  private readonly fakeStorage = new Map<string, string>();

  async createHash(plaintext: string): Promise<string> {
    const fakeHash = `hashed-${plaintext}`;
    this.fakeStorage.set(fakeHash, plaintext);
    return fakeHash;
  }

  async compareHash(plaintext: string, digest: string): Promise<boolean> {
    const originalPlaintext = this.fakeStorage.get(digest);
    return originalPlaintext === plaintext;
  }
}
