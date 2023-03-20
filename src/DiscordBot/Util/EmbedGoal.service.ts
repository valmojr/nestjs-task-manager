import { Injectable } from '@nestjs/common';
import { Goal, Task } from '@prisma/client';
import { EmbedBuilder } from 'discord.js';
import { StatusColorPicker } from './StatusColorPicker.service';
@Injectable()
export class EmbedGoalService {
  public async generate(goal: Goal): Promise<EmbedBuilder> {
    const embed = new EmbedBuilder();
    embed.setTitle(goal.title);
    embed.setDescription(goal.description);
    embed.setImage(goal.image);
    embed.setFooter({ text: `ID: ${goal.id}` });

    return embed;
  }

  public async addTasks(embedGoal: EmbedBuilder, goalTasks: Task[]) {
    const completeTasks = goalTasks.filter(
      (task) => task.status === 'completed',
    ).length;

    const statusNumber = Math.round((completeTasks / goalTasks.length) * 100);

    console.log(completeTasks);
    console.log(statusNumber);

    embedGoal.setColor(StatusColorPicker.getColor(statusNumber));
    goalTasks.forEach((task) => {
      task.userId === null
        ? (task.userId = 'no one')
        : (task.userId = `<@${task.userId.toString()}>`);

      embedGoal.addFields({
        name: task.title,
        value: `Assigned to: ${task.userId}`,
        inline: true,
      });
    });

    return embedGoal;
  }
}
