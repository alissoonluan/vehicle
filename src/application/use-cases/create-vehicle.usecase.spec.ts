import expect from 'unexpected';
import { CreateVehicleUsecase } from './create-vehicle.usecase';
import { InMemoryVehicleRepository } from '../../../test/repositories/in-memory-vehicle-repository';
import { Vehicle, VehicleProps } from '../entities/vehicle';
import { VehiclePlateAlreadyExists } from './errors/vehicle-plate-already-exists';
import { VehicleRenavamAlreadyExists } from './errors/vehicle-renavam-already-exists';
import { makeVehicle, makeVehicleEntity } from '../../../test/factories';
import { FakeVehicleValidator } from '../../../test/factories/fake-vehicle-validator';
import { IVehicleValidator } from './vehicle-validator';

describe('Create Vehicle Usecase', () => {
  let vehicleRepository: InMemoryVehicleRepository;
  let createVehicleUsecase: CreateVehicleUsecase;
  let vehicle: VehicleProps;
  let vehicleEntity: Vehicle;
  let fakeVehicleValidator: IVehicleValidator;

  beforeEach(() => {
    vehicleRepository = new InMemoryVehicleRepository();
    fakeVehicleValidator = new FakeVehicleValidator();
    createVehicleUsecase = new CreateVehicleUsecase(
      vehicleRepository,
      fakeVehicleValidator,
    );
    vehicle = makeVehicle();
    vehicleEntity = makeVehicleEntity();
  });

  describe('execute', () => {
    it('should create a vehicle successfully', async () => {
      const result = await createVehicleUsecase.execute(vehicle);

      expect(result.vehicle, 'to have properties', [
        'plate',
        'renavam',
        'brand',
      ]);
      expect(result.vehicle.plate, 'to equal', vehicle.plate);
      expect(result.vehicle.renavam, 'to equal', vehicle.renavam);
      expect(result.vehicle.model, 'to equal', vehicle.model);
      expect(result.vehicle.brand, 'to equal', vehicle.brand);
      expect(result.vehicle.year, 'to equal', vehicle.year);
      expect(result.vehicle.userId, 'to equal', vehicle.userId);
    });

    it('should throw error if plate already exists', async () => {
      await vehicleRepository.create(vehicleEntity);

      try {
        createVehicleUsecase.execute(vehicle);
      } catch (error) {
        expect(error, 'to be rejected with', VehiclePlateAlreadyExists);
      }
    });

    it('should throw error if renavam already exists', async () => {
      await vehicleRepository.create(vehicleEntity);

      const vehicleWithSameRenavam = new Vehicle({
        plate: 'DEF5678',
        renavam: vehicle.renavam,
        model: 'Model Y',
        brand: 'Tesla',
        year: 2023,
        userId: 'user456',
      });

      try {
        createVehicleUsecase.execute(vehicleWithSameRenavam);
      } catch (error) {
        expect(error, 'to be rejected with', VehicleRenavamAlreadyExists);
      }
    });
  });
});
