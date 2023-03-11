import { Injectable } from '@nestjs/common';
import { Context, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';
import { EmbedGoalService } from '../util/EmbedGoal.service';

@Injectable()
export class CheckGoalsCommand {
  constructor(
    private readonly goalService: GoalService,
    private embedGoalService: EmbedGoalService,
  ) {}

  public async onGoalsCheck(@Context() [interaction]: SlashCommandContext) {
    const goals = await this.goalService.findAll();
    const embedGoals = goals.map((goal) =>
      this.embedGoalService.createGoalEmbed(goal),
    );

    return interaction.reply({
      content: `We have ${embedGoals.length} goals!`,
    });
  }
}
