import { Vehicle } from '@application/entities/vehicle';
import { VehicleRepository } from '@application/repositories/vehicle-repository';

export class InMemoryVehicleRepository implements VehicleRepository {
  private vehicles: Vehicle[] = [];

  async getAll(userId: string): Promise<Vehicle[]> {
    return this.vehicles.filter((vehicle) => vehicle.userId === userId);
  }

  async findUnique(
    keyType: 'plate' | 'renavam' | 'id',
    identifier: string,
  ): Promise<Vehicle | null> {
    const vehicle = this.vehicles.find(
      (vehicle) => vehicle[keyType] === identifier,
    );

    return vehicle || null;
  }

  async create(vehicle: Vehicle): Promise<void> {
    this.vehicles.push(vehicle);
  }

  async update(vehicle: Vehicle): Promise<void> {
    const vehicleIndex = this.vehicles.findIndex(
      (item) => item.id === vehicle.id,
    );

    if (vehicleIndex >= 0) this.vehicles[vehicleIndex] = vehicle;
  }

  async delete(id: string): Promise<void> {
    this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
  }
}
