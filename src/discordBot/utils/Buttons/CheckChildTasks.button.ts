import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`CheckChildTasks/${taskId}`)
    .setLabel('Check subtasks')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Primary);
