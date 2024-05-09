import { Public } from '@decorators/public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignInAuthBody } from '../dtos/signin-auth-body';
import { SignInAuthUsecase } from '@application/use-cases/sign-in-auth.usecase';
import { AuthViewModel } from '../view-models/auth-view-model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private signInAuthUsecase: SignInAuthUsecase) { }

  @Public()
  @ApiBody({ type: SignInAuthBody })
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'The Authorization successfully',
    schema: {
      example: {
        accessToken: 'access_token',
      },
    },
  })
  async signIn(@Body() signinBody: SignInAuthBody) {
    const { accessToken } = await this.signInAuthUsecase.execute(signinBody);

    const raw = AuthViewModel.toHttp(accessToken);

    return {
      accessToken: raw,
    };
  }
}
