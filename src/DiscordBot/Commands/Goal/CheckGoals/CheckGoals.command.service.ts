import { EmbedBuilder } from 'discord.js';
import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class CheckGoalsCommand {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
  ) {}

  private logger = new Logger(CheckGoalsCommand.name);

  @SlashCommand({
    name: 'check-goals',
    description: 'Check the Goals we have',
  })
  public async onGoalsCheck(@Context() [interaction]: SlashCommandContext) {
    const goals = await this.goalService.findAll();
    const tasks = await this.taskService.findAll();

    const embedGoals = goals.map((goal) => {
      const goalTasks = tasks.filter((task) => task.goalId === goal.id);
      const embedGoal = new EmbedBuilder();
      embedGoal.setTitle(goal.title);
      embedGoal.setDescription(goal.description);
      embedGoal.setImage(goal.image);
      goalTasks.forEach((task) => {
        if (task.userId == null) {
          task.userId = 'no one';
        } else {
          embedGoal.addFields({
            name: task.title,
            value: `Assigned to <@${task.userId}>`,
            inline: true,
          });
        }
      });
      embedGoal.setFooter({ text: `id: ${goal.id}` });

      return embedGoal;
    });

    this.logger.log(`${interaction.user.username} checked the goals`);

    if (embedGoals.length > 0) {
      return await interaction.reply({
        embeds: [...embedGoals],
        ephemeral: true,
      });
    } else {
      return await interaction.channel.send({
        content: `There are no goals, go get some!`,
      });
    }
  }
}
