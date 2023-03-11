import { EmbedBuilder } from '@discordjs/builders';
import { Injectable } from '@nestjs/common';
import { Goal, Task } from '@prisma/client';

@Injectable()
export class EmbedGoalService {
  public async createGoalEmbed(goal: Goal, goalTasks: Task[]) {
    const embed = new EmbedBuilder();

    embed.setTitle(goal.title);
    embed.setDescription(goal.description);
    embed.setImage(goal.image);
    goalTasks.forEach((task) => {
      if (task.userId === null) task.userId = 'no one';

      embed.addFields({
        name: task.title,
        value: `Assigned to <@${task.userId}>`,
        inline: true,
      });
    });
    embed.setFooter({ text: `id: ${goal.id}` });

    return embed;
  }
}
