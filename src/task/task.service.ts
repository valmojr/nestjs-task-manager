import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Task } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/Database/Database.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger: Logger = new Logger(TaskService.name);

  async create(task: Task) {
    this.logger.log(`Task service creating task: ${task.title}`);

    if (task.fatherTaskId) {
      const fatherTask = await this.prismaService.task.findUnique({
        where: { id: task.fatherTaskId },
      });
      if (fatherTask.level < task.level) {
        return this.prismaService.task.create({
          data: {
            ...task,
            level: fatherTask.level + 1,
            id: randomUUID(),
          },
        });
      } else {
        this.logger.error(
          'Tried to create a task with a level lower than the father task',
        );

        throw new BadRequestException(
          'The level of the task must be greater than the level of the father task',
        );
      }
    } else {
      return this.prismaService.task.create({
        data: {
          ...task,
          level: 0,
          id: randomUUID(),
        },
      });
    }
  }

  async findAll() {
    this.logger.log('Task service finding all tasks');

    return this.prismaService.task.findMany();
  }

  async findById(id: string) {
    this.logger.log(`Task service finding task with id: ${id}`);

    return this.prismaService.task.findUnique({ where: { id } });
  }

  async findByGuildId(guildId: string) {
    this.logger.log(`Task service finding task with guildId: ${guildId}`);

    return this.prismaService.task.findMany({ where: { guildId } });
  }

  async findByFatherTaskId(fatherTaskId: string) {
    this.logger.log(
      `Task service finding tasks with fatherTaskId: ${fatherTaskId}`,
    );

    return this.prismaService.task.findMany({ where: { fatherTaskId } });
  }

  async findByUserId(userId: string) {
    this.logger.log(`Task service finding tasks with userId: ${userId}`);

    return this.prismaService.task.findMany({
      where: {
        userIDs: {
          has: userId,
        },
      },
    });
  }

  async update(id: string, task: Task) {
    this.logger.log(`Task service updating task with id: ${id}`);

    return this.prismaService.task.update({
      where: { id },
      data: task,
    });
  }

  async remove(id: string) {
    this.logger.log(`Task service removing task with id: ${id}`);

    return this.prismaService.task.delete({ where: { id } });
  }
}
