import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';
import { UserRepository } from '@application/repositories/user-repository';
import { User } from '@application/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) { }
  async create(user: User): Promise<void> {
    try {
      const raw = PrismaUserMapper.toPrisma(user);
      await this.prisma.user.create({ data: raw });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    return user ? PrismaUserMapper.toDomain(user) : null;
  }
}
