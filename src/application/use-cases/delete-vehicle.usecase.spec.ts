import expect from 'unexpected';
import { DeleteVehicleUsecase } from './delete-vehicle.usecase';
import { InMemoryVehicleRepository } from '../../../test/repositories/in-memory-vehicle-repository';
import { Vehicle } from '../entities/vehicle';
import { VehicleNotFound } from './errors/vehicle-not-found';
import { makeVehicleEntity } from '../../../test/factories';

describe('Delete Vehicle Usecase', () => {
  let vehicleRepository: InMemoryVehicleRepository;
  let deleteVehicleUsecase: DeleteVehicleUsecase;
  let vehicle: Vehicle;

  beforeEach(() => {
    vehicleRepository = new InMemoryVehicleRepository();
    deleteVehicleUsecase = new DeleteVehicleUsecase(vehicleRepository);
    vehicle = makeVehicleEntity();
  });

  it('should delete a vehicle successfully', async () => {
    await vehicleRepository.create(vehicle);

    await deleteVehicleUsecase.execute({ id: vehicle.id });

    const deletedVehicle = await vehicleRepository.findUnique('id', vehicle.id);
    expect(deletedVehicle, 'to be', null);
  });

  it('should throw error if vehicle is not found', async () => {
    try {
      deleteVehicleUsecase.execute({ id: 'nonexistent_id' });
    } catch (error) {
      expect(error, 'to be rejected with', VehicleNotFound);
    }
  });
});
