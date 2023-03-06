import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async createUser(id: string, name: string, avatar: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        id,
        name,
        avatar,
      },
    });
  }

  async updateUser(id: string, name: string, avatar: string): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: {
        id,
        name,
        avatar,
      },
    });
  }

  async deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
