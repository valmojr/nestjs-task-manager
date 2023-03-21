import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { CronService } from 'src/DiscordBot/Cron.service';
import ChannelWiper from 'src/DiscordBot/Util/ChannelWiper';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class DashboardCommandService {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {}

  private logger = new Logger(DashboardCommandService.name);

  @SlashCommand({
    name: 'dashboard',
    description: 'Create a dashboard for your goals and tasks in a channel',
  })
  async dashboardCreator(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(
      `Dashboard command called by ${interaction.user.username} in ${interaction.guild.name} - ${interaction.guild.name}`,
    );
    ChannelWiper([interaction]);

    const goals = await this.goalService.findAll();
    const tasks = await this.taskService.findAll();

    const embedGoals = await Promise.all(
      goals.map(async (goal) => {
        const goalTasks = tasks.filter((task) => task.goalId === goal.id);
        const embedGoal = await this.embedGeneratorService.generate(goal);
        return await this.embedGeneratorService.addTasks(embedGoal, goalTasks);
      }),
    );

    new CronService('*/30 * * * * *', () => {
      ChannelWiper([interaction]);
      this.logger.log(
        `${interaction.guild.name} - ${interaction.channel.name} - Dashboard updated`,
      );
      interaction.channel.send({
        content: `${interaction.guild.name} - ${interaction.channel.name}`,
        embeds: embedGoals,
      });
    });

    return interaction.reply({
      content: `Dashboard assigned`,
      ephemeral: true,
    });
  }
}