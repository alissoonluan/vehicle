import expect from 'unexpected';
import { CreateUserUsecase } from './create-user.usecase';
import { InMemoryUserRepository } from '../../../test/repositories/in-memory-user-repository';
import { UserEmailAlreadyExists } from './errors/user-email-already-exists';
import { User, UserProps } from '../entities/user';
import {
  makeUser,
  makeUserEntity,
  FakeHashProvider,
} from '../../../test/factories';

describe('Create User Usecase', () => {
  let userRepository: InMemoryUserRepository;
  let hashProvider: FakeHashProvider;
  let createUserUsecase: CreateUserUsecase;
  let user: UserProps;
  let userEntity: User;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    hashProvider = new FakeHashProvider();
    createUserUsecase = new CreateUserUsecase(userRepository, hashProvider);
    user = makeUser();
    userEntity = makeUserEntity();
  });

  it('should create a new user when the email does not already exist', async () => {
    const hashedPassword = await hashProvider.createHash(user.password);

    try {
      const response = await createUserUsecase.execute(user);

      expect(response.user, 'to have properties', [
        'password',
        'email',
        'name',
      ]);
      expect(response.user.email, 'to equal', user.email);
      expect(response.user.name, 'to equal', user.name);
      expect(response.user.password, 'to equal', hashedPassword);
    } catch (error) {
      expect(error.message.length, 'to be greater than', 0);
      console.log(error);
    }
  });

  it('should throw an error if the email already exists', async () => {
    await userRepository.create(userEntity);

    try {
      await createUserUsecase.execute(user);
    } catch (error) {
      expect(error, 'not to be', UserEmailAlreadyExists);
    }
  });
});
