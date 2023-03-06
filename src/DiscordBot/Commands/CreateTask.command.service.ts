import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { Task } from '@prisma/client';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { PrismaService } from 'src/Database/Prisma.service';
import { StatusAutoCompleteInterceptor } from '../util/status.interceptor.service';
import { CreateTaskDTO } from './CreateTask.dto';

@Injectable()
export class CreateTaskCommand {
  constructor(private prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  private async taskCreatorHandler(
    data: Task,
    whoCreated: string,
  ): Promise<Task> {
    const logger = new Logger(CreateTaskCommand.name);

    const randomNumber: number = Math.floor(Math.random() * 1000000000);

    if (data.status === undefined) data.status = 'pending';
    if (data.userId === undefined) data.userId = null;
    if (data.image === undefined) data.image = null;

    const createdTask: Task = {
      id: randomNumber,
      title: data.title,
      description: data.description,
      status: data.status,
      userId: data.userId,
      image: data.image,
    };

    if (data.userId !== undefined) {
      logger.log(`Task ${data.title} created by ${whoCreated}!`);
    } else {
      logger.log(
        `Task ${data.title} created by ${whoCreated} and assigned to ${data.userId}!`,
      );
    }

    return this.prismaService.task.create({ data: createdTask });
  }

  @UseInterceptors(StatusAutoCompleteInterceptor)
  @SlashCommand({
    name: 'create-task-command',
    description: 'Create a task!',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskCreation(
    @Context() [interaction]: SlashCommandContext,
    @Options() task: CreateTaskDTO,
  ) {
    await this.taskCreatorHandler(
      {
        id: null,
        title: task.title,
        description: task.description,
        status: task.status,
        userId: task.userId,
        image: task.image,
      },
      interaction.user.username,
    );

    return await interaction.reply({
      content: `Task created!`,
    });
  }
}
