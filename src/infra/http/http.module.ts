import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { AuthController } from './controllers/auth.controller';
import { HashProvider } from '@infra/providers/hash.provider';
import { JwtProvider } from '@infra/providers/jwt.provider';
import { VehicleController } from './controllers/vehicle.controller';
import { useCases } from '@application/use-cases';
import { JWT_SERVICE_TOKEN } from '@infra/constants/jwt.constracts';
import { VEHICLE_VALIDATOR } from '@infra/constants/vehicle-validator-constracts';
import { VehicleValidator } from '@application/use-cases/vehicle-validator';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController, AuthController, VehicleController],
  providers: [
    ...useCases,
    HashProvider,
    {
      provide: JWT_SERVICE_TOKEN,
      useClass: JwtProvider,
    },
    {
      provide: VEHICLE_VALIDATOR,
      useClass: VehicleValidator,
    },
    VehicleValidator,
  ],
})
export class HttpModule { }
