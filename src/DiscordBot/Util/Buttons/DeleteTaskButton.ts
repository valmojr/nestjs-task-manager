import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`DeleteTask/${taskId}`)
    .setLabel('Delete')
    .setEmoji('🗑️')
    .setStyle(ButtonStyle.Danger);
