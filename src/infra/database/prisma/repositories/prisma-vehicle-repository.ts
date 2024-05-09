import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Vehicle } from '@application/entities/vehicle';
import { PrismaVehicleMapper } from '../mappers/prisma-vehicle-mapper';
import { VehicleRepository } from '@application/repositories/vehicle-repository';

import { Prisma } from '@prisma/client';

type VehicleWhereUniqueInput = Prisma.VehicleWhereUniqueInput;

@Injectable()
export class PrismaVehicleRepository implements VehicleRepository {
  constructor(private prisma: PrismaService) { }
  async create(vehicle: Vehicle): Promise<void> {
    const raw = PrismaVehicleMapper.toPrisma(vehicle);
    await this.prisma.vehicle.create({ data: raw });
  }

  async findUnique(
    keyType: 'id' | 'renavam' | 'plate',
    keyValue: string,
  ): Promise<Vehicle | null> {
    let findUniqueInput: VehicleWhereUniqueInput | null = null;

    if (keyType && keyValue) {
      findUniqueInput = {
        [keyType]: keyValue,
      } as unknown as VehicleWhereUniqueInput;
    }

    const vehicle = await this.prisma.vehicle.findUnique({
      where: findUniqueInput,
    });

    return vehicle ? PrismaVehicleMapper.toDomain(vehicle) : null;
  }
  async update(vehicle: Vehicle): Promise<void> {
    const raw = PrismaVehicleMapper.toPrisma(vehicle);

    await this.prisma.vehicle.update({
      where: { id: vehicle.id },
      data: raw,
    });
  }
  async getAll(userId: string): Promise<Vehicle[]> {
    const vehicles = await this.prisma.vehicle.findMany({
      where: {
        deletedAt: null,
        userId,
      },
    });

    return vehicles.map(PrismaVehicleMapper.toDomain);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.vehicle.delete({
      where: { id: id },
    });
  }
}
