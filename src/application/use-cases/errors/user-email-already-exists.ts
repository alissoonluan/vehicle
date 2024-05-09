import { ConflictException } from '@nestjs/common';

export class UserEmailAlreadyExists extends ConflictException {
  constructor() {
    super('User Already Exists');
  }
}
