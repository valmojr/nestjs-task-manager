import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';

@Injectable()
export class CheckGoalsCommand {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {}

  private logger = new Logger(CheckGoalsCommand.name);

  @SlashCommand({
    name: 'check-goals',
    description: 'Check the Goals we have',
  })
  public async onGoalsCheck(@Context() [interaction]: SlashCommandContext) {
    const goals = await this.goalService.findAll();
    const tasks = await this.taskService.findAll();

    const embeds = await Promise.all(
      goals.map(async (goal) => {
        const goalTasks = tasks.filter((task) => task.goalId === goal.id);
        const embedGoal = await this.embedGeneratorService.generate(goal);
        const embedGoalWithTasks = await this.embedGeneratorService.addTasks(
          embedGoal,
          goalTasks,
        );

        return embedGoalWithTasks;
      }),
    );

    this.logger.log(`${interaction.user.username} checked the goals`);

    if (embeds.length > 0) {
      return await interaction.reply({
        embeds,
        ephemeral: true,
      });
    } else {
      return await interaction.channel.send({
        content: `There are no goals, go get some!`,
      });
    }
  }
}
