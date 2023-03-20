import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import ChannelWiper from 'src/DiscordBot/Util/ChannelWiper';
import { EmbedGoalService } from 'src/DiscordBot/Util/EmbedGoal.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class DashboardCommandService {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
    private readonly embedGoalService: EmbedGoalService,
  ) {}

  private logger = new Logger(DashboardCommandService.name);

  @SlashCommand({
    name: 'dashboard',
    description: 'Create a dashboard for your goals and tasks in a channel',
  })
  async dashboardCreator(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(
      `Dashboard command called by ${interaction.user.username} in ${interaction.channel.name} - ${interaction.guild.name}`,
    );

    ChannelWiper([interaction]);

    const goals = await this.goalService.findAll();
    const tasks = await this.taskService.findAll();

    const embedGoals = await Promise.all(
      goals.map(async (goal) => {
        const goalTasks = tasks.filter((task) => task.goalId === goal.id);
        const embedGoal = await this.embedGoalService.generate(goal);
        return await this.embedGoalService.addTasks(embedGoal, goalTasks);
      }),
    );
    return interaction.reply({
      content: `Dashboard with ${goals.length} goals and ${tasks.length} tasks`,
      embeds: embedGoals,
    });
  }
}
