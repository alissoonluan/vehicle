import { Vehicle } from '@application/entities/vehicle';
import { Vehicle as RawVehicle } from '@prisma/client';

export class PrismaVehicleMapper {
  static toPrisma(vehicle: Vehicle) {
    return {
      id: vehicle.id,
      brand: vehicle.brand,
      model: vehicle.model,
      plate: vehicle.plate,
      renavam: vehicle.renavam,
      year: vehicle.year,
      createdAt: vehicle.createdAt,
      updatedAt: vehicle.updatedAt,
      deletedAt: vehicle.deletedAt,
      user: {
        connect: { id: vehicle.userId },
      },
    };
  }

  static toDomain(raw: RawVehicle): Vehicle {
    return new Vehicle(
      {
        brand: raw.brand,
        model: raw.model,
        plate: raw.plate,
        renavam: raw.renavam,
        year: raw.year,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
        userId: raw.userId,
      },
      raw.id,
    );
  }
}
