import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { TaskService } from 'src/task/task.service';
import { CreateTaskDTO } from './CreateTask.dto';

@Injectable()
export class CreateTaskCommand {
  taskHandler: TaskService;

  private taskCreatorHandler(
    taskTitle: string,
    taskDescription: string,
    taskStatus?: string,
    taskAssignee?: string,
    taskImage?: string,
  ): Task {
    const randomNumber: number = Math.floor(Math.random() * 1000000000);

    if (taskStatus === undefined) taskStatus = 'pendent';
    if (taskAssignee === undefined) taskAssignee = null;
    if (taskImage === undefined) taskImage = null;

    const createdTask = {
      id: randomNumber,
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
      userId: taskAssignee,
      image: taskImage,
    };

    this.taskHandler.createTaskByTaskObject(createdTask);

    return createdTask;
  }
  @SlashCommand({
    name: 'create-task-command',
    description: 'Create a task!',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskCreation(
    @Context() [interaction]: SlashCommandContext,
    @Options() task: CreateTaskDTO,
  ) {
    return interaction.reply({ content: `Task ${task.title} here` });
  }

  @SlashCommand({
    name: 'create-task',
    description: 'Create a task!',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onModalTaskCreation(
    @Context() [interaction]: SlashCommandContext,
    @Options() task: CreateTaskDTO,
  ) {
    return interaction.reply({ content: `Task ${task.title} here` });
  }
}
