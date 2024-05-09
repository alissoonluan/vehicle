import { VehicleRepository } from '../repositories/vehicle-repository';
import { Inject, Injectable } from '@nestjs/common';
import { Vehicle } from '../entities/vehicle';
import { VehicleNotFound } from './errors/';
import { IVehicleValidator } from './vehicle-validator';
import { VEHICLE_VALIDATOR } from '../../infra/constants/vehicle-validator-constracts';

interface UpdateVehicleRequest {
  id: string;
  plate?: string;
  renavam?: string;
  model?: string;
  brand?: string;
  year?: number;
}

interface UpdateVehicleResponse {
  vehicle: Vehicle;
}

@Injectable()
export class UpdateVehicleUsecase {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    @Inject(VEHICLE_VALIDATOR) private vehicleValidator: IVehicleValidator,
  ) { }

  private async getVehicleById(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findUnique('id', id);
    if (!vehicle) {
      throw new VehicleNotFound();
    }
    return vehicle;
  }

  async execute(request: UpdateVehicleRequest): Promise<UpdateVehicleResponse> {
    const { id, plate, renavam } = request;
    const vehicle = await this.getVehicleById(id);

    if (plate) await this.vehicleValidator.validatePlateUnique(plate);

    if (renavam) await this.vehicleValidator.validateRenavamUnique(renavam);

    vehicle.update(request);
    await this.vehicleRepository.update(vehicle);

    return { vehicle };
  }
}
