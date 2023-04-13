import { Task } from '@prisma/client';
import { EmbedBuilder } from 'discord.js';
import setColor from './setColor';

export default (task: Task, childTasks: number, showTitle: boolean) => {
  const embedTask = new EmbedBuilder().setDescription(task.description);

  if (showTitle) {
    embedTask.setTitle(task.title);
  }

  if (childTasks > 0) {
    embedTask.addFields([
      {
        name: 'Subtasks',
        value: `${childTasks}`,
        inline: true,
      },
      { name: 'Status', value: `${task.status}%`, inline: true },
    ]);
  }

  if (task.image) {
    embedTask.setImage(task.image);
  }

  if (task.userIDs.length > 0) {
    embedTask.setColor(setColor(task.status));
    embedTask.addFields({
      name: 'Assigned Users',
      value: task.userIDs.join(', '),
      inline: true,
    });
  } else {
    embedTask.addFields({
      name: 'Assigned Users',
      value: 'No one',
      inline: true,
    });
  }

  return embedTask;
};
