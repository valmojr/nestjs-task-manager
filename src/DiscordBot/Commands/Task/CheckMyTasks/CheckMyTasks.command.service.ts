import { Injectable, Logger } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { TaskService } from 'src/task/task.service';
import { StatusColorPicker } from '../util/statuscolors.service';

@Injectable()
export class CheckMyTasksCommand {
  constructor(private readonly taskService: TaskService) {}

  private logger = new Logger(CheckMyTasksCommand.name);

  @SlashCommand({
    name: 'check-my-tasks',
    description: 'Check your tasks',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSelfTaskCheck(@Context() [interaction]: SlashCommandContext) {
    const tasks = await this.taskService.findAll();
    const userTasks = tasks.filter(
      (task) => task.userId === interaction.user.id,
    );

    const userNotCompletedTasks = userTasks.filter(
      (task) => task.status !== 'completed',
    );

    const embedUserTasks = userNotCompletedTasks.map((task) =>
      new EmbedBuilder()
        .setTitle(task.title)
        .setDescription(task.description)
        .setColor('Yellow')
        .setFooter({ text: `Task ID: ${task.id}` }),
    );

    this.logger.log(
      `${interaction.user.username} just checked his ${userTasks.length} tasks`,
    );

    if (embedUserTasks.length > 0)
      await interaction.reply({
        embeds: [...embedUserTasks],
      });

    return await interaction.reply({
      content: `You have no tasks, go get some!`,
      ephemeral: true,
    });
  }
}
