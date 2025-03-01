import { PrismaClient } from '@prisma/client';
import { User } from '@/domain/user/User';
import { UserRepository } from '@/domain/user/UserRepository';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  public async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return User.reconstitute(
      user.id,
      user.email,
      user.password,
      user.name || undefined
    );
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return User.reconstitute(
      user.id,
      user.email,
      user.password,
      user.name || undefined
    );
  }

  public async save(user: User): Promise<void> {
    try {
      user.getId();
      // If no error is thrown, the user has an ID
      await this.prisma.user.update({
        where: { id: user.getId() },
        data: {
          email: user.getEmail(),
          name: user.getName(),
        },
      });
    } catch {
      // If getId() throws, this is a new user
      const created = await this.prisma.user.create({
        data: {
          email: user.getEmail(),
          password: user.getHashedPassword(),
          name: user.getName(),
        },
      });
      user.setId(created.id);
    }
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
} 