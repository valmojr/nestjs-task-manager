import { Injectable, Logger } from '@nestjs/common';
import { Task } from '.prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/Database/Prisma.service';
import { EmbedTaskService } from 'src/DiscordBot/util/embedTask.service';
import { CreateTaskCommand } from './CreateTask.command.service';

@Injectable()
export class CreateTaskHandler extends EmbedTaskService {
  private prisma: PrismaService;

  async taskCreatorHandler(
    data: Task | Omit<Task, 'id'>,
    whoCreated: string,
  ): Promise<Task> {
    const logger = new Logger(CreateTaskCommand.name);
    if (data.description === null)
      data.description = 'Description not provided';
    if (data.status === null) data.status = 'pending';

    const createdTask: Omit<Task, 'id'> = {
      title: data.title,
      description: data.description,
      status: data.status,
      userId: data.userId,
      image: data.image,
      dueDate: data.dueDate,
      goalId: data.goalId,
    };

    if (data.userId == null) {
      logger.log(`Task ${data.title} created by ${whoCreated}!`);
    } else {
      logger.log(
        `Task ${data.title} created by ${whoCreated} and assigned to ${data.userId}!`,
      );
    }

    return await this.prisma.task.create({
      data: {
        ...createdTask,
        id: randomUUID(),
      },
    });
  }
}
