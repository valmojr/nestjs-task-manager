import { Task } from '@prisma/client';
import { EmbedBuilder, ColorResolvable } from 'discord.js';

const setColor = (status: number): ColorResolvable => {
  if (status === 100) {
    return 0x00ff00;
  } else if (status > 70) {
    return 0xddff00;
  } else if (status > 50) {
    return 0xffff00;
  } else if (status > 25) {
    return 0xff7700;
  } else {
    return 0xff0000;
  }
};

export default (task: Task) => {
  let assignees = '';

  if (task.userIDs.length === 0) {
    assignees = `no one`;
  } else if (task.userIDs.length === 1) {
    task.userIDs.forEach((id) => {
      assignees += `<@${id}>`;
    });
  } else {
    task.userIDs.forEach((id) => {
      assignees += `<@${id}>, `;
    });
  }

  if (task.userIDs.length > 1) {
    return new EmbedBuilder()
      .setTitle(task.title)
      .setDescription(task.description)
      .setThumbnail(task.image)
      .setColor(setColor(task.status))
      .addFields([
        {
          name: 'Assignees',
          value: assignees,
        },
      ]);
  } else {
    return new EmbedBuilder()
      .setTitle(task.title)
      .setDescription(task.description)
      .setThumbnail(task.image)
      .setColor(0x444)
      .addFields([
        {
          name: 'Assignee',
          value: assignees,
        },
      ]);
  }
};
