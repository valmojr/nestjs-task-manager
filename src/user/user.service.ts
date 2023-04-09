import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/Database/Database.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger: Logger = new Logger(UserService.name);

  create(data: User) {
    this.logger.log(
      `User service creating user with data: ${JSON.stringify(data)}`,
    );

    return this.prismaService.user.create({
      data: {
        ...data,
        id: randomUUID(),
      },
    });
  }

  findOrCreate(data: User) {
    this.logger.log(
      `User service finding or creating user with data: ${JSON.stringify(
        data,
      )}`,
    );

    return this.prismaService.user.upsert({
      create: {
        ...data,
        id: randomUUID(),
      },
      update: data,
      where: { id: data.id },
    });
  }

  findAll() {
    this.logger.log('User service finding all users');

    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    this.logger.log(`User service finding user with id: ${id}`);

    return `This action returns a #${id} user`;
  }

  update(id: string, data: User) {
    this.logger.log(
      `User service updating user with id: ${id} and data: ${JSON.stringify(
        data,
      )}`,
    );

    return this.prismaService.user.update({ where: { id }, data });
  }

  remove(id: string) {
    this.logger.log(`User service removing user with id: ${id}`);

    return this.prismaService.user.delete({ where: { id } });
  }
}
