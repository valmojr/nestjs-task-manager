import { EmbedBuilder, MessageResolvable } from 'discord.js';
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class CheckGoalsCommand {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
  ) {}

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

    const wipe = async () => {
      let msg_size = 100;
      while (msg_size == 100) {
        try {
          await interaction.channel
            .bulkDelete(100)
            .then((messages) => (msg_size = messages.size))
            .catch(console.error);
        } catch (error) {
          console.log(error);
        }
      }
      interaction.channel.send({
        content: `nuke!`,
      });
    };

    if (embedGoals.length > 0) {
      await wipe();
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
