import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { UserNotFound, UserPasswordNotMatch } from './errors';
import { HashProvider } from '../../infra/providers/hash.provider';
import { JwtServiceInterface } from '../../infra/providers/jwt.provider';
import { RedisCacheService } from '../../infra/database/redis/redis.service';
import { JWT_SERVICE_TOKEN } from '../../infra/constants/jwt.constracts';

interface SignInAuthRequest {
  email: string;
  password: string;
}

interface SignInAuthResponse {
  accessToken: string;
}

@Injectable()
export class SignInAuthUsecase {
  constructor(
    private userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    @Inject(JWT_SERVICE_TOKEN) private jwtProvider: JwtServiceInterface,
    private readonly redisCacheService: RedisCacheService,
  ) { }

  async execute(request: SignInAuthRequest): Promise<SignInAuthResponse> {
    const userByEmail = await this.userRepository.findByEmail(request.email);

    if (!userByEmail) throw new UserNotFound();

    const passwordMatch = await this.hashProvider.compareHash(
      request.password,
      userByEmail.password,
    );

    if (!passwordMatch) throw new UserPasswordNotMatch();

    const cacheKey = `user:${userByEmail.id}:token`;
    let accessToken = await this.redisCacheService.getToken(cacheKey);

    if (!accessToken) {
      accessToken = await this.jwtProvider.encryptToken({
        id: userByEmail.id,
        email: userByEmail.email,
      });
      const ttl = await this.jwtProvider.getExpirationDuration(accessToken);
      await this.redisCacheService.setToken(cacheKey, accessToken, ttl);
    }

    return { accessToken };
  }
}
