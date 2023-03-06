import { Task } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { StatusColorPicker } from './statuscolors.service';

@Injectable()
export class EmbedTaskService {
  public createTaskEmbed(task: Task): EmbedBuilder {
    const embed = new EmbedBuilder();

    embed.setTitle(task.title);
    embed.setDescription(task.description);
    embed.setColor(new StatusColorPicker().getColor(task.status));
    embed.addFields({
      name: 'Status',
      value: task.status,
    });
    if (task.userId)
      embed.addFields({
        name: 'Assigned to',
        value: task.userId,
      });

    if (task.dueDate)
      embed.addFields({
        name: 'Due Date',
        value: task.dueDate,
      });

    return embed;
  }
}
