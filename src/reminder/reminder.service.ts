import { Injectable, Logger } from '@nestjs/common';
import { Reminder } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/Database/Database.service';

@Injectable()
export class ReminderService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger: Logger = new Logger(ReminderService.name);

  create(data: Reminder) {
    this.logger.log(
      `Reminder Service creating reminder with data: ${JSON.stringify(data)}`,
    );

    return this.prismaService.reminder.create({
      data: {
        ...data,
        id: randomUUID(),
      },
    });
  }

  findAll() {
    this.logger.log('Reminder Service finding all reminders');

    return this.prismaService.reminder.findMany();
  }

  findOne(id: string) {
    this.logger.log(`Reminder Service finding reminder with id: ${id}`);

    return this.prismaService.reminder.findUnique({ where: { id } });
  }

  update(id: string, data: Reminder) {
    this.logger.log(`Reminder Service updating reminder with id: ${id}`);

    return this.prismaService.reminder.update({ where: { id }, data });
  }

  remove(id: string) {
    this.logger.log(`Reminder Service removing reminder with id: ${id}`);

    return this.prismaService.reminder.delete({ where: { id } });
  }
}
