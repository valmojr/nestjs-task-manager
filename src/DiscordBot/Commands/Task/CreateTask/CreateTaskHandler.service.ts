import { Injectable, Logger } from '@nestjs/common';
import { Task } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/Database/Prisma.service';
import { EmbedTaskService } from 'src/DiscordBot/util/embedTask.service';
import { TaskInput } from 'src/task/entity/Task.entity';
import { CreateTaskCommand } from './CreateTask.command.service';

@Injectable()
export class CreateTaskHandler extends EmbedTaskService {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async taskCreatorHandler(data: TaskInput, whoCreated: string): Promise<Task> {
    const logger = new Logger(CreateTaskCommand.name);
    if (data.description === null)
      data.description = 'Description not provided';
    if (data.status === null) data.status = 'pending';

    const createdTask: TaskInput = {
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
        `${data.title} created by ${whoCreated} and assigned to ${data.userId}!`,
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
