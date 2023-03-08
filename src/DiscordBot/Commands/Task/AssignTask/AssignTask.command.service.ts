import { Injectable, UseInterceptors } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { StatusAutoCompleteInterceptor } from '../../../util/status.interceptor.service';
import { EmbedTaskService } from 'src/DiscordBot/util/embedTask.service';
import { AssignTaskDTO } from './AssignTask.dto';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class AssignTaskCommand extends EmbedTaskService {
  constructor(private readonly taskService: TaskService) {
    super();
  }

  @UseInterceptors(StatusAutoCompleteInterceptor)
  @SlashCommand({
    name: 'assign-task',
    description: 'Assign a task to a user',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskCreation(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: AssignTaskDTO,
  ) {
    const currentTask = await this.taskService.findById(params.taskId);
    const assignedTask = await this.taskService.update({
      ...currentTask,
      userId: params.userId,
      status: 'pending',
    });

    return await interaction.reply({
      embeds: [EmbedTaskService.createTaskEmbed(assignedTask)],
    });
  }
}
