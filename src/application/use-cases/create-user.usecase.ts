import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user-repository';
import { User } from '../entities/user';
import { UserEmailAlreadyExists } from './errors';
import { HashProvider } from '../../infra/providers/hash.provider';

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUserUsecase {
  constructor(
    private userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
  ) { }

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const emailAlreadyExists = await this.userRepository.findByEmail(
      request.email,
    );

    if (emailAlreadyExists) throw new UserEmailAlreadyExists();

    const hashedPassword = await this.hashProvider.createHash(request.password);

    const user = new User({
      ...request,
      password: hashedPassword,
    });
    await this.userRepository.create(user);

    return { user };
  }
}
