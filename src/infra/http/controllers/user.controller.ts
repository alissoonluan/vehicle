import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserBody } from '../dtos/create-user-body';
import { Public } from '@decorators/public.decorator';
import { CreateUserUsecase } from '@application/use-cases/create-user.usecase';
import { UserViewModel } from '../view-models/user-view-model';
import { User } from '@application/entities/user';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private createUserUsecase: CreateUserUsecase) { }

  @ApiBody({ type: CreateUserBody })
  @Public()
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      example: User,
    },
  })
  @Post()
  async create(@Body() createUserBody: CreateUserBody) {
    const { user } = await this.createUserUsecase.execute(createUserBody);

    const raw = UserViewModel.toHttp(user);

    return {
      user: raw,
    };
  }
}
