import { VehicleRepository } from '../repositories/vehicle-repository';
import { Injectable } from '@nestjs/common';
import { VehicleNotFound } from './errors';

interface CreateUserRequest {
  id: string;
}

@Injectable()
export class DeleteVehicleUsecase {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute({ id }: CreateUserRequest): Promise<void> {
    const vehicleExists = await this.vehicleRepository.findUnique('id', id);
    if (!vehicleExists) {
      throw new VehicleNotFound();
    }
    vehicleExists.delete();
    await this.vehicleRepository.delete(id);
  }
}
