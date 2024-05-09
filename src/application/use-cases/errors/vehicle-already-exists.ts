import { ConflictException } from '@nestjs/common';

export class VehicleAlreadyExists extends ConflictException {
  constructor() {
    super('Vehicle Already Exists');
  }
}
