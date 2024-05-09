export class FakeJwtService {
  private readonly tokens: Record<string, any> = {};

  sign(payload: any): string {
    const token = JSON.stringify(payload);
    this.tokens[token] = payload;
    return token;
  }

  verify(token: string): any {
    const payload = this.tokens[token];
    if (!payload) {
      throw new Error('Token not found');
    }
    return payload;
  }
}
