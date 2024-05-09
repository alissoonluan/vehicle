import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetLoggedUser } from '@decorators/get-logged-user.decorator';
import { User } from '@application/entities/user';
import { CreateVehicleUsecase } from '@application/use-cases/create-vehicle.usecase';
import { CreateVehicleBody } from '../dtos/create-vehicle-body';
import { VehicleViewModel } from '../view-models/vehicle-view-model';
import { Vehicle } from '@application/entities/vehicle';
import { GetAllVehicleUsecase } from '@application/use-cases/get-all-vehicle.usecase';
import { DeleteVehicleUsecase } from '@application/use-cases/delete-vehicle.usecase';
import { UpdateVehicleBody } from '../dtos/update-vehicle-body';
import { UpdateVehicleUsecase } from '@application/use-cases/update-vehicle.usecase';

@ApiTags('vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly createVehicleUsecase: CreateVehicleUsecase,
    private readonly getAllVehicleUsecase: GetAllVehicleUsecase,
    private readonly deleteVehicleUsecase: DeleteVehicleUsecase,
    private readonly updateVehicleUsecase: UpdateVehicleUsecase,
  ) { }

  @ApiBody({ type: CreateVehicleBody })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The vehicle has been successfully created.',
    schema: {
      example: Vehicle,
    },
  })
  async create(
    @Body() createVehicleBody: CreateVehicleBody,
    @GetLoggedUser() userLogged: User,
  ) {
    const vehicleCreate = {
      ...createVehicleBody,
      userId: userLogged.id,
    };
    const { vehicle } = await this.createVehicleUsecase.execute(vehicleCreate);

    const raw = VehicleViewModel.toHttp(vehicle);

    return {
      vehicle: raw,
    };
  }

  @Get()
  async getAll(@GetLoggedUser() userLogged: User) {
    const { vehicles } = await this.getAllVehicleUsecase.execute({
      userId: userLogged.id,
    });

    return {
      vehicles: vehicles.map(VehicleViewModel.toHttp),
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteVehicleUsecase.execute({ id });
  }

  @ApiBody({ type: UpdateVehicleBody })
  @Put(':id')
  async update(
    @Body() updateVehicleBody: UpdateVehicleBody,
    @Param('id') id: string,
  ) {
    const vehicleUpated = {
      ...updateVehicleBody,
      id,
    };
    await this.updateVehicleUsecase.execute(vehicleUpated);
  }
}
