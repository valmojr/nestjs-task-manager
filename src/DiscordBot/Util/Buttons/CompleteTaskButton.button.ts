import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`CompleteTask/${taskId}`)
    .setLabel('Complete')
    .setEmoji('✅')
    .setStyle(ButtonStyle.Success);
