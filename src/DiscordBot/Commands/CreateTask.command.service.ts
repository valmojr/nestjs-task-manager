import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { Task } from '.prisma/client';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { PrismaService } from 'src/Database/Prisma.service';
import { StatusAutoCompleteInterceptor } from '../util/status.interceptor.service';
import { CreateTaskDTO } from './CreateTask.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CreateTaskCommand {
  constructor(private prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  private async taskCreatorHandler(
    data: Task | Omit<Task, 'id'>,
    whoCreated: string,
  ): Promise<Task> {
    const logger = new Logger(CreateTaskCommand.name);

    if (data.description) data.description = 'Description not provided';
    if (data.status === null) data.status = 'pending';
    if (data.userId === null) data.userId = 'not assigned';

    const createdTask = {
      title: data.title,
      description: data.description,
      status: data.status,
      userId: data.userId,
      image: data.image,
      dueDate: data.dueDate,
    };

    if (data.userId !== undefined) {
      logger.log(`Task ${data.title} created by ${whoCreated}!`);
    } else {
      logger.log(
        `Task ${data.title} created by ${whoCreated} and assigned to ${data.userId}!`,
      );
    }

    return await this.prismaService.task.create({
      data: {
        id: randomUUID(),
        ...createdTask,
      },
    });
  }

  @UseInterceptors(StatusAutoCompleteInterceptor)
  @SlashCommand({
    name: 'create-task',
    description: 'Create a task!',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskCreation(
    @Context() [interaction]: SlashCommandContext,
    @Options() task: CreateTaskDTO,
  ) {
    await this.taskCreatorHandler(
      {
        ...task,
        goalId: null,
      },
      interaction.user.username,
    );

    return await interaction.reply({
      content: `Task created!`,
    });
  }
}
