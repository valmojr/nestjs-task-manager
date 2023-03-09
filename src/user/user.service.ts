import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(user: User): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...user,
        id: randomUUID(),
      },
    });
  }

  async updateUser(user: User): Promise<User> {
    const { id } = user;

    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async updateUserByID(
    id: string,
    user: User | Omit<User, 'id'>,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async deleteUserById(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async deleteUserByObject(user: User): Promise<User> {
    const { id } = user;

    return this.prisma.user.delete({ where: { id } });
  }

  async findOrCreateUser(user: User): Promise<User> {
    const { id } = user;

    const userExists = await this.prisma.user.findUnique({
      where: { id },
    });

    if (userExists) {
      return userExists;
    }

    return this.prisma.user.create({
      data: user,
    });
  }
}
