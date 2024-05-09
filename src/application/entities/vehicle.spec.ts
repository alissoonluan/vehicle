import expect from 'unexpected';
import { describe, it, beforeEach } from 'mocha';
import { Vehicle, VehicleProps } from './vehicle';
import { User } from './user';

describe('Vehicle', () => {
  let props: VehicleProps;
  let vehicle: Vehicle;

  beforeEach(() => {
    props = {
      plate: 'ABC123',
      renavam: '123456789',
      model: 'Sedan',
      brand: 'Toyota',
      year: 2022,
      createdAt: new Date(),
      userId: 'user-1',
      updatedAt: new Date(),
    };
    vehicle = new Vehicle(props);
  });

  describe('constructor', () => {
    it('should use provided ID if available', () => {
      const customId = 'custom-id';
      const vehicleWithId = new Vehicle(
        { ...props, createdAt: new Date() },
        customId,
      );
      expect(vehicleWithId.id, 'to equal', customId);
    });
    it('should create a new vehicle instance with the provided properties', () => {
      expect(vehicle.plate, 'to equal', props.plate);
      expect(vehicle.renavam, 'to equal', props.renavam);
      expect(vehicle.model, 'to equal', props.model);
      expect(vehicle.brand, 'to equal', props.brand);
      expect(vehicle.year, 'to equal', props.year);
      expect(vehicle.createdAt, 'to equal', props.createdAt);
      expect(vehicle.updatedAt, 'to equal', props.updatedAt);
      expect(vehicle.id, 'to be a', 'string');
      expect(vehicle.id.length, 'to be', 36);
    });
  });

  describe('setters and getters', () => {
    it('should set and get the plate', () => {
      vehicle.plate = 'DEF456';
      expect(vehicle.plate, 'to equal', 'DEF456');
    });

    it('should set and get the renavam', () => {
      vehicle.renavam = '65756765';
      expect(vehicle.renavam, 'to equal', '65756765');
    });

    it('should set and get the model', () => {
      vehicle.model = 'Cross';
      expect(vehicle.model, 'to equal', 'Cross');
    });

    it('should set and get the brand', () => {
      vehicle.brand = 'Honda';
      expect(vehicle.brand, 'to equal', 'Honda');
    });

    it('should set and get the year', () => {
      vehicle.year = 2021;
      expect(vehicle.year, 'to equal', 2021);
    });

    it('should set and get the user', () => {
      const user = new User({
        email: 'user@example.com',
        name: 'John',
        password: 'John123',
      });
      vehicle.user = user;
      expect(vehicle.user, 'to equal', user);
    });
  });

  describe('update method', () => {
    it('should update the vehicle properties with the provided partial properties', () => {
      const updatedProps: Partial<VehicleProps> = {
        plate: 'XYZ789',
        year: 2023,
      };

      vehicle.update(updatedProps);
      expect(vehicle.plate, 'to equal', updatedProps.plate);
      expect(vehicle.year, 'to equal', updatedProps.year);
    });
  });

  describe('delete method', () => {
    it('should set deletedAt to the current date when delete is called', () => {
      vehicle.delete();

      expect(vehicle.deletedAt, 'to be a', Date);
      expect(vehicle.deletedAt.getTime(), 'to be close to', Date.now(), 100);
    });
  });
});
