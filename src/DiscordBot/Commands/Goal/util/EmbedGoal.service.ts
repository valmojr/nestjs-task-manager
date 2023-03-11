import { EmbedBuilder } from '@discordjs/builders';
import { Injectable } from '@nestjs/common';
import { Goal } from '@prisma/client';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class EmbedGoalService {
  constructor(private readonly taskService: TaskService) {}

  async createGoalEmbed(goal: Goal) {
    const goalTasks = await this.taskService.findByGoalId(goal.id);
    const embed = new EmbedBuilder();

    embed.setTitle(goal.title);
    embed.setDescription(goal.description);
    embed.setImage(goal.image);
    goalTasks.forEach((task) => {
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
