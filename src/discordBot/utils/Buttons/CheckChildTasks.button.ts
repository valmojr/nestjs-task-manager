import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`CheckChildTasksButton/${taskId}`)
    .setLabel('Check Subtasks')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Primary);
