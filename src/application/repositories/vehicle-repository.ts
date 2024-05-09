import { Vehicle } from '@application/entities/vehicle';

export abstract class VehicleRepository {
  abstract create(vehicle: Vehicle): Promise<void>;
  abstract findUnique(
    keyType: 'id' | 'renavam' | 'plate',
    identifier: string,
  ): Promise<Vehicle | null>;
  abstract update(vehicle: Vehicle): Promise<void>;
  abstract getAll(userId: string): Promise<Vehicle[]>;
  abstract delete(id: string): Promise<void>;
}
