import { Injectable } from '@nestjs/common';
import { Goal, Task } from '@prisma/client';
import { EmbedBuilder } from 'discord.js';
import { StatusColorPicker } from './StatusColorPicker.service';
@Injectable()
export class EmbedGeneratorService {
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

    embedGoal.setColor(StatusColorPicker.getGoalColor(statusNumber));
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

  public static createTaskEmbed(task: Task) {
    const embed = new EmbedBuilder();

    embed.setTitle(task.title);
    task.description
      ? embed.setDescription(task.description)
      : embed.setDescription('No description provided');
    embed.setColor(StatusColorPicker.getTaskColor(task.status));

    embed.addFields({
      name: 'Status',
      value: this.literalTaskStatus(task),
      inline: true,
    });
    if (task.userId)
      embed.addFields({
        name: 'Assigned to',
        value: `<@${task.userId}>`,
        inline: true,
      });
    if (task.dueDate)
      embed.addFields({
        name: 'Due Date',
        value: task.dueDate.toString(),
        inline: true,
      });
    if ('id' in task) embed.setFooter({ text: `Task ID: ${task.id}` });

    return embed;
  }

  public static literalTaskStatus({ status }: Task): string {
    switch (status) {
      case 'not_assigned':
        return 'Not Assigned';
      case 'pending':
        return 'Pending';
      case 'completed':
        return 'Completed';
      case 'stuck':
        return 'Stuck';
      case 'on_hold':
        return 'On Hold';
      default:
        return 'Unknown';
    }
  }
}
