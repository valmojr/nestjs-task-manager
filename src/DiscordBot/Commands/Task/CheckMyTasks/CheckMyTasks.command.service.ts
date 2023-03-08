import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { EmbedTaskService } from 'src/DiscordBot/util/embedTask.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class CheckMyTasksCommand {
  constructor(private readonly taskService: TaskService) {}
  @SlashCommand({
    name: 'check-my-tasks',
    description: 'Check your tasks',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskCreation(
    @Context() [interaction]: SlashCommandContext,
  ) {
    const myTasks = await this.taskService.findByUserId(interaction.user.id);

    if (myTasks.length === 0) {
      return await interaction.reply({
        content: 'You have no tasks',
      });
    } else if (myTasks.length === 1) {
      return await interaction.reply({
        embeds: [EmbedTaskService.createTaskEmbed(myTasks[0])],
      });
    } else {
      return await interaction.reply({
        embeds: myTasks.map((task) => EmbedTaskService.createTaskEmbed(task)),
      });
    }
  }
}
