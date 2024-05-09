import { User } from '@application/entities/user';
import { UserRepository } from '@application/repositories/user-repository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email);

    if (!user) return null;

    return user;
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
  }
}
