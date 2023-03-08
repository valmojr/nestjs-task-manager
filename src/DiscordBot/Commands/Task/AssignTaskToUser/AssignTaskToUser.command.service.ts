import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { EmbedTaskService } from 'src/DiscordBot/util/embedTask.service';
import { AssignTaskToUserDTO } from './AssignTaskToUser.dto';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';

@Injectable()
export class AssignTaskToUserCommand extends EmbedTaskService {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {
    super();
  }

  @SlashCommand({
    name: 'assign-tasks-to-user',
    description: 'Assign a task to a user',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskAssign(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: AssignTaskToUserDTO,
  ) {
    const currentTask = await this.taskService.findById(params.taskId);

    const assignedUser = await this.userService.findOrCreateUser({
      id: interaction.guild.members.cache.get(params.userId).user.id,
      name: interaction.guild.members.cache.get(params.userId).user.username,
      avatar: interaction.guild.members.cache.get(params.userId).user.avatar,
    });

    return await interaction.reply({
      content: `Task ${currentTask.title} assigned to ${assignedUser.id}`,
      embeds: [
        EmbedTaskService.createTaskEmbed(
          await this.taskService.assignTask(params.taskId, params.userId),
        ),
      ],
    });
  }
}
