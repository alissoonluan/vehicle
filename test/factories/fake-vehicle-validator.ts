import { IVehicleValidator } from '../../src/application/use-cases/vehicle-validator';
import {
  VehiclePlateAlreadyExists,
  VehicleRenavamAlreadyExists,
} from '../../src/application/use-cases/errors';

export class FakeVehicleValidator implements IVehicleValidator {
  private plates: Set<string> = new Set();
  private renavams: Set<string> = new Set();

  addPlate(plate: string): void {
    this.plates.add(plate);
  }

  addRenavam(renavam: string): void {
    this.renavams.add(renavam);
  }

  async validatePlateUnique(plate: string): Promise<void> {
    if (this.plates.has(plate)) {
      throw new VehiclePlateAlreadyExists();
    }
  }

  async validateRenavamUnique(renavam: string): Promise<void> {
    if (this.renavams.has(renavam)) {
      throw new VehicleRenavamAlreadyExists();
    }
  }
}
