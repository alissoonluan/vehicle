import { VehicleProps, Vehicle } from '../../src/application/entities/vehicle';

type Override = Partial<VehicleProps>;

export function makeVehicle(override: Override = {}) {
  return {
    plate: 'ABC123',
    renavam: '123456789',
    model: 'Sedan',
    brand: 'Toyota',
    year: 2022,
    createdAt: new Date(),
    userId: 'user123',
    id: 'vehicle-123',
    ...override,
  };
}

export function makeVehicleEntity(override: Override = {}) {
  const vehicle = makeVehicle(override);

  return new Vehicle(vehicle);
}
