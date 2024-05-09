import { UnauthorizedException } from '@nestjs/common';

export class VehicleNotFound extends UnauthorizedException {
  constructor() {
    super('Vehicle Not Found.');
  }
}
