import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVehicleBody {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  plate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  renavam: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  model: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  year: number;
}
