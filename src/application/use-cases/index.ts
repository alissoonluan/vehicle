import { CreateUserUsecase } from './create-user.usecase';
import { CreateVehicleUsecase } from './create-vehicle.usecase';
import { DeleteVehicleUsecase } from './delete-vehicle.usecase';
import { GetAllVehicleUsecase } from './get-all-vehicle.usecase';
import { SignInAuthUsecase } from './sign-in-auth.usecase';
import { UpdateVehicleUsecase } from './update-vehicle.usecase';
import { VehicleValidator } from './vehicle-validator';

export const useCases = [
  CreateUserUsecase,
  CreateVehicleUsecase,
  DeleteVehicleUsecase,
  GetAllVehicleUsecase,
  SignInAuthUsecase,
  UpdateVehicleUsecase,
  VehicleValidator,
];
