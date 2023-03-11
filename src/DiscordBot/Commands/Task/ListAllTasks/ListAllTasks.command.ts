import { Injectable } from '@nestjs/common';
import { Ctx, SlashCommand, SlashCommandContext } from 'necord';
import { TaskService } from 'src/task/task.service';
import { EmbedTaskService } from '../util/embedTask.service';

@Injectable()
export class ListAllTasksCommand {
  constructor(private readonly taskService: TaskService) {}

  @SlashCommand({
    name: 'list-all-tasks',
    description: 'List all tasks',
  })
  public async onListAllTasksCommand(
    @Ctx() [interaction]: SlashCommandContext,
  ) {
    const tasks = await this.taskService.findAll();

    const embedTasks = tasks.map((task) =>
      EmbedTaskService.createTaskEmbed(task),
    );

    return interaction.reply({
      embeds: [...embedTasks],
    });
  }
}
