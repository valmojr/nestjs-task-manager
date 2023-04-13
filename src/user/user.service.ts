import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/Database/Database.service';
import IdGenerator from 'src/utils/IdGenerator';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger: Logger = new Logger(UserService.name);

  async create(data: Omit<User, 'id'>) {
    this.logger.log(
      `User service creating user with data: ${JSON.stringify(data)}`,
    );

    const { discordId } = data;

    const user = await this.prismaService.user.findMany({
      where: { discordId },
    })[0];

    if (user) {
      return this.prismaService.user.update({
        where: { discordId },
        data,
      });
    } else {
      return this.prismaService.user.create({
        data: {
          ...data,
          id: IdGenerator(),
        },
      });
    }
  }

  async findOrCreate(data: Omit<User, 'id'>): Promise<User> {
    this.logger.log(
      `User service finding or creating user with data: ${JSON.stringify(
        data,
      )}`,
    );

    const { discordId } = data;

    const user: User = await this.prismaService.user.findFirst({
      where: { discordId },
    });

    if (user) {
      return user;
    } else {
      return this.prismaService.user.create({
        data: {
          ...data,
          id: IdGenerator(),
        },
      });
    }
  }

  async findAll(): Promise<User[]> {
    this.logger.log('User service finding all users');

    return this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<User> {
    this.logger.log(`User service finding user with id: ${id}`);

    return this.prismaService.user.findUnique({ where: { id } });
  }

  async findByDiscordId(discordId: string): Promise<User> {
    this.logger.log(`User service finding user with discordId: ${discordId}`);

    return (
      await this.prismaService.user.findMany({
        where: { discordId },
      })
    )[0];
  }

  async updateById(userId: string, user: User): Promise<User> {
    const { id, ...data } = user;

    this.logger.log(
      `User service updating user with id: ${id} and data: ${JSON.stringify(
        data,
      )}`,
    );

    return this.prismaService.user.update({ where: { id: userId }, data });
  }

  async updateByDiscordId(discordId: string, data: User): Promise<User> {
    const { id, ...dataWithoutId } = data;

    this.logger.log(
      `User service updating user with discordId: ${discordId} and data: ${JSON.stringify(
        { ...dataWithoutId, id },
      )}`,
    );

    return this.prismaService.user.update({
      where: { discordId: data.discordId },
      data: dataWithoutId,
    });
  }

  async removeById(id: string): Promise<User> {
    this.logger.log(`User service removing user with id: ${id}`);

    return this.prismaService.user.delete({ where: { id } });
  }
}
