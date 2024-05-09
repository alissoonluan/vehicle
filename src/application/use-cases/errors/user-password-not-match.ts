import { UnauthorizedException } from '@nestjs/common';

export class UserPasswordNotMatch extends UnauthorizedException {
  constructor() {
    super('User Password Not Match.');
  }
}
