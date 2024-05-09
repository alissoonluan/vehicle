import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';
import { User, UserProps } from '../entities/user';
import { SignInAuthUsecase } from './sign-in-auth.usecase';
import { UserNotFound, UserPasswordNotMatch } from './errors';
import expect from 'unexpected';
import {
  makeUser,
  makeUserEntity,
  FakeJwtService,
  FakeRedisService,
  FakeJwtProvider,
  FakeRedisCacheService,
  FakeHashProvider,
} from '../../../test/factories';

describe('Sign In Authentication Usecase', () => {
  let userRepository: InMemoryUserRepository;
  let hashProvider: FakeHashProvider;
  let jwtProvider: FakeJwtProvider;
  let redisCacheService: FakeRedisCacheService;
  let signInAuthUsecase: SignInAuthUsecase;
  let user: UserProps;
  let userEntity: User;
  let jwtService: FakeJwtService;
  let redisService: FakeRedisService;

  beforeEach(async () => {
    userRepository = new InMemoryUserRepository();
    hashProvider = new FakeHashProvider();
    jwtService = new FakeJwtService();
    jwtProvider = new FakeJwtProvider(jwtService);
    redisService = new FakeRedisService();
    redisCacheService = new FakeRedisCacheService(redisService);
    signInAuthUsecase = new SignInAuthUsecase(
      userRepository,
      hashProvider,
      jwtProvider,
      redisCacheService,
    );
    user = makeUser();
    userEntity = makeUserEntity();
    await userRepository.create(userEntity);
  });

  it('should sign in successfully with valid credentials', async () => {
    userEntity.password = await hashProvider.createHash(user.password);
    const response = await signInAuthUsecase.execute(user);
    expect(response.accessToken, 'to be a', 'string');

    const cacheKey = `user:${userEntity.id}:token`;
    const cachedToken = await redisCacheService.getToken(cacheKey);
    expect(cachedToken, 'to equal', response.accessToken);
  });

  it('should throw UserNotFound error when user is not found', async () => {
    const request = { email: 'nonexistent@example.com', password: 'password' };

    try {
      signInAuthUsecase.execute(request);
    } catch (error) {
      expect(error).to.be.a(UserNotFound);
    }
  });

  it('should throw UserPasswordNotMatch error when password does not match', async () => {
    const request = { email: user.email, password: 'wrong-password' };

    try {
      signInAuthUsecase.execute(request);
    } catch (error) {
      expect(error).to.be.a(UserPasswordNotMatch);
    }
  });
});
