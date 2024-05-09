import { Vehicle } from '@application/entities/vehicle';

export class VehicleViewModel {
  static toHttp(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      plate: vehicle.plate,
      renavam: vehicle.renavam,
      model: vehicle.model,
      brand: vehicle.brand,
      year: vehicle.year,
    };
  }
}
