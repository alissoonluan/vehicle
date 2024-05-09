import { Vehicle } from '../entities/vehicle';
import { VehicleRepository } from '../repositories/vehicle-repository';
import { Inject, Injectable } from '@nestjs/common';
import { IVehicleValidator } from './vehicle-validator';
import { VEHICLE_VALIDATOR } from '../../infra/constants/vehicle-validator-constracts';

interface CreateUserRequest {
  plate: string;
  renavam: string;
  model: string;
  brand: string;
  year: number;
  userId: string;
}

interface CreateUserResponse {
  vehicle: Vehicle;
}

@Injectable()
export class CreateVehicleUsecase {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    @Inject(VEHICLE_VALIDATOR) private vehicleValidator: IVehicleValidator,
  ) { }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { plate, renavam } = request;

    await this.vehicleValidator.validatePlateUnique(plate);
    await this.vehicleValidator.validateRenavamUnique(renavam);

    const vehicle = new Vehicle(request);
    await this.vehicleRepository.create(vehicle);

    return { vehicle };
  }
}
