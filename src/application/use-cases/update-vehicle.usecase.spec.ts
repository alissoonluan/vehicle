import expect from 'unexpected';
import { UpdateVehicleUsecase } from './update-vehicle.usecase';
import { InMemoryVehicleRepository } from '../../../test/repositories/in-memory-vehicle-repository';
import { Vehicle, VehicleProps } from '../entities/vehicle';
import { VehicleNotFound } from './errors/vehicle-not-found';
import { VehiclePlateAlreadyExists } from './errors/vehicle-plate-already-exists';
import { VehicleRenavamAlreadyExists } from './errors/vehicle-renavam-already-exists';
import {
  makeVehicle,
  makeVehicleEntity,
} from '../../../test/factories/vehicle-factory';
import { IVehicleValidator } from './vehicle-validator';
import { FakeVehicleValidator } from '../../../test/factories/fake-vehicle-validator';

describe('Update Vehicle Usecase', () => {
  let vehicleRepository: InMemoryVehicleRepository;
  let updateVehicleUsecase: UpdateVehicleUsecase;
  let vehicle: VehicleProps;
  let vehicleEntity: Vehicle;
  let fakeVehicleValidator: IVehicleValidator;

  beforeEach(() => {
    vehicleRepository = new InMemoryVehicleRepository();
    fakeVehicleValidator = new FakeVehicleValidator();
    updateVehicleUsecase = new UpdateVehicleUsecase(
      vehicleRepository,
      fakeVehicleValidator,
    );

    vehicle = makeVehicle();
    vehicleEntity = makeVehicleEntity();
  });

  it('should update vehicle successfully', async () => {
    await vehicleRepository.create(vehicleEntity);

    const updatedData = {
      plate: 'DEF5678',
      model: 'Model Y',
    };

    const response = await updateVehicleUsecase.execute({
      id: vehicleEntity.id,
      ...updatedData,
    });
    expect(response.vehicle.id, 'to equal', vehicleEntity.id);
    expect(response.vehicle.plate, 'to equal', updatedData.plate);
    expect(response.vehicle.model, 'to equal', updatedData.model);
    expect(response.vehicle.renavam, 'to equal', vehicle.renavam);
    expect(response.vehicle.brand, 'to equal', vehicle.brand);
    expect(response.vehicle.year, 'to equal', vehicle.year);
  });

  it('should throw error if vehicle not found', async () => {
    return updateVehicleUsecase
      .execute({ id: 'nonexistent_id', plate: 'DEF5674' })
      .then(() => {
        throw new Error(
          'Expected updateVehicleUsecase to throw VehicleNotFound error',
        );
      })
      .catch((error) => {
        if (!(error instanceof VehicleNotFound)) {
          throw new Error(
            'Expected error to be an instance of VehicleNotFound',
          );
        }
      });
  });

  it('should throw error if plate already exists', async () => {
    await vehicleRepository.create(vehicleEntity);

    const existingVehicle = new Vehicle({
      plate: 'DEF5678',
      renavam: '09876543210',
      model: 'Model Z',
      brand: 'Ford',
      year: 2023,
      userId: 'user456',
    });
    await vehicleRepository.create(existingVehicle);

    try {
      await updateVehicleUsecase.execute({
        id: vehicleEntity.id,
        plate: 'DEF5678',
      });
    } catch (error) {
      expect(error, 'to be a', VehiclePlateAlreadyExists);
    }
  });

  it('should throw error if renavam already exists', async () => {
    await vehicleRepository.create(vehicleEntity);

    const existingVehicle = new Vehicle({
      plate: 'XYZ9876',
      renavam: '12345678901',
      model: 'Model Z',
      brand: 'Ford',
      year: 2023,
      userId: 'user456',
    });
    await vehicleRepository.create(existingVehicle);

    try {
      await updateVehicleUsecase.execute({
        id: vehicleEntity.id,
        renavam: '12345678901',
      });
    } catch (error) {
      expect(error, 'to be a', VehicleRenavamAlreadyExists);
    }
  });
});
