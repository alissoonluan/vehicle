import { ConflictException } from '@nestjs/common';

export class VehicleRenavamAlreadyExists extends ConflictException {
  constructor() {
    super('Vehicle Renavam Already Exists');
  }
}
