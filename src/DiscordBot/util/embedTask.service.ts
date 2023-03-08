import { Task } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { StatusColorPicker } from './statuscolors.service';
import { TaskInput } from 'src/task/entity/Task.entity';

@Injectable()
export class EmbedTaskService {
  public static createTaskEmbed(task: Task) {
    const embed = new EmbedBuilder();

    embed.setTitle(task.title);
    embed.setDescription(task.description);
    embed.setColor(new StatusColorPicker().getColor(task.status));

    embed.addFields({
      name: 'Status',
      value: task.status,
      inline: true,
    });
    if (task.userId)
      embed.addFields({
        name: 'Assigned to',
        value: task.userId,
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
}
