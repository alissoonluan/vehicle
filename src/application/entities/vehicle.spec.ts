import expect from 'unexpected';
import { describe, it } from 'mocha';
import { Vehicle, VehicleProps } from './vehicle';

describe('Vehicle', () => {
  let props: VehicleProps;

  beforeEach(() => {
    props = {
      plate: 'ABC123',
      renavam: '123456789',
      model: 'Sedan',
      brand: 'Toyota',
      year: 2022,
      createdAt: new Date(),
      userId: 'user-1',
    };
  });
  describe('constructor', () => {
    it('should create a new vehicle instance with the provided properties', () => {
      const vehicle = new Vehicle(props);

      expect(vehicle.plate, 'to equal', props.plate);
      expect(vehicle.renavam, 'to equal', props.renavam);
      expect(vehicle.model, 'to equal', props.model);
      expect(vehicle.brand, 'to equal', props.brand);
      expect(vehicle.year, 'to equal', props.year);
      expect(vehicle.createdAt, 'to equal', props.createdAt);
      expect(vehicle.id, 'to be a', 'string');
    });
  });

  describe('update', () => {
    it('should update the vehicle properties with the provided partial properties', () => {
      const vehicle = new Vehicle(props);

      const updatedProps: Partial<VehicleProps> = {
        plate: 'XYZ789',
        year: 2023,
      };

      vehicle.update(updatedProps);

      expect(vehicle.plate, 'to equal', updatedProps.plate);
      expect(vehicle.year, 'to equal', updatedProps.year);
    });
  });
});
