import { ConflictException } from '@nestjs/common';

export class VehiclePlateAlreadyExists extends ConflictException {
  constructor() {
    super('Vehicle Plate Already Exists');
  }
}
