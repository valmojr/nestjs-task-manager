import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { EmbedGoalService } from '../util/EmbedGoal.service';

@Injectable()
export class CheckGoalsCommand {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
    private embedGoalService: EmbedGoalService,
  ) {}

  @SlashCommand({
    name: 'check-goals',
    description: 'Check the Goals we have',
  })
  public async onGoalsCheck(@Context() [interaction]: SlashCommandContext) {
    const goals = await this.goalService.findAll();

    const embedGoals = goals.map(async (goal) => {
      const goalTasks = this.taskService.findByGoalId(goal.id);

      return (await goalTasks).length;
    });

    return interaction.reply({
      content: `We have ${goals.length} goals`,
    });
  }
}
