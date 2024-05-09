import { UnauthorizedException } from '@nestjs/common';

export class UserNotFound extends UnauthorizedException {
  constructor() {
    super('User Not Found.');
  }
}
