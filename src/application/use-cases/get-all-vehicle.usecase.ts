import { Vehicle } from '../entities/vehicle';
import { VehicleRepository } from '../repositories/vehicle-repository';
import { Injectable } from '@nestjs/common';

interface CreateUserRequest {
  userId: string;
}

interface CreateUserResponse {
  vehicles: Vehicle[];
}

@Injectable()
export class GetAllVehicleUsecase {
  constructor(private readonly vehicleRepository: VehicleRepository) { }

  async execute({ userId }: CreateUserRequest): Promise<CreateUserResponse> {
    const vehicles = await this.vehicleRepository.getAll(userId);

    return { vehicles };
  }
}
