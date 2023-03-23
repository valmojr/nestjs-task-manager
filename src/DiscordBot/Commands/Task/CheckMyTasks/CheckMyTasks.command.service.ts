import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class CheckMyTasksCommand {
  constructor(
    private readonly taskService: TaskService,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {}

  private logger = new Logger(CheckMyTasksCommand.name);

  @SlashCommand({
    name: 'check-my-tasks',
    description: 'Check your tasks',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSelfTaskCheck(@Context() [interaction]: SlashCommandContext) {
    const tasks = await this.taskService.findAll();
    const userNotCompletedTasks = tasks.filter(
      (task) =>
        task.userId === interaction.user.id && task.status !== 'completed',
    );

    const embedUserTasks = await Promise.all(
      userNotCompletedTasks.map((task) =>
        this.embedGeneratorService.createTaskEmbed(task),
      ),
    );

    this.logger.log(
      `${interaction.user.username} just checked his pendent tasks`,
    );

    if (embedUserTasks.length > 0) {
      await interaction.reply({
        embeds: embedUserTasks,
        ephemeral: true,
      });
    } else {
      return await interaction.reply({
        content: `You have no tasks, go get some!`,
        ephemeral: true,
      });
    }
  }
}
