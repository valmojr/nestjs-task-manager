import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`EditTask/${taskId}`)
    .setLabel('Edit')
    .setEmoji('✏️')
    .setStyle(ButtonStyle.Link);
