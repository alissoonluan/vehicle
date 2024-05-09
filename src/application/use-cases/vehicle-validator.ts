import { Injectable } from '@nestjs/common';
import { VehicleRepository } from '../repositories/vehicle-repository';
import {
  VehiclePlateAlreadyExists,
  VehicleRenavamAlreadyExists,
} from './errors';

export interface IVehicleValidator {
  validatePlateUnique(plate: string): Promise<void>;
  validateRenavamUnique(renavam: string): Promise<void>;
}

@Injectable()
export class VehicleValidator {
  constructor(private vehicleRepository: VehicleRepository) { }

  async validatePlateUnique(plate: string): Promise<void> {
    const existingPlate = await this.vehicleRepository.findUnique(
      'plate',
      plate,
    );
    if (existingPlate) {
      throw new VehiclePlateAlreadyExists();
    }
  }

  async validateRenavamUnique(renavam: string): Promise<void> {
    const existingRenavam = await this.vehicleRepository.findUnique(
      'renavam',
      renavam,
    );
    if (existingRenavam) {
      throw new VehicleRenavamAlreadyExists();
    }
  }
}
