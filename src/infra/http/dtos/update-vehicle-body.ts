import { PartialType } from '@nestjs/swagger';
import { CreateVehicleBody } from './create-vehicle-body';

export class UpdateVehicleBody extends PartialType(CreateVehicleBody) { }
