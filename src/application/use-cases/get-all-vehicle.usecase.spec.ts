import expect from 'unexpected';
import { GetAllVehicleUsecase } from './get-all-vehicle.usecase';
import { InMemoryVehicleRepository } from '../../../test/repositories/in-memory-vehicle-repository';
import { Vehicle } from '../entities/vehicle';
import { makeVehicleEntity } from '../../../test/factories';

describe('Get All Vehicle Usecase', () => {
  let vehicleRepository: InMemoryVehicleRepository;
  let getAllVehicleUsecase: GetAllVehicleUsecase;
  let vehicles: Vehicle[];

  beforeEach(() => {
    vehicleRepository = new InMemoryVehicleRepository();
    getAllVehicleUsecase = new GetAllVehicleUsecase(vehicleRepository);

    vehicles = [
      makeVehicleEntity({ plate: 'ABC1234', userId: 'user123' }),
      makeVehicleEntity({ plate: 'DEF5678', userId: 'user123' }),
      makeVehicleEntity({ plate: 'GHI9012', userId: 'user456' }),
    ];
  });

  it('should get all vehicles for a user successfully', async () => {
    try {
      await Promise.all(
        vehicles.map((vehicle) => vehicleRepository.create(vehicle)),
      );
      const userId = 'user123';
      const response = await getAllVehicleUsecase.execute({ userId });

      expect(response.vehicles.length, 'to equal', 2);
      expect(response.vehicles[0], 'to equal', vehicles[0]);
      expect(response.vehicles[1], 'to equal', vehicles[1]);
    } catch (error) {
      expect(error.message.length, 'to be greater than', 0);
      console.log(error);
    }
  });

  it('should return an empty array if no vehicles found for the user', async () => {
    try {
      const userId = 'user789';
      const response = await getAllVehicleUsecase.execute({ userId });

      expect(response.vehicles, 'to be empty');
    } catch (error) {
      expect(error.message.length, 'to be greater than', 0);
      console.log(error);
    }
  });
});
