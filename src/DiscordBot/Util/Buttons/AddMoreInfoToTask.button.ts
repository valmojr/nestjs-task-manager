import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`AddMoreInfoToTask/${taskId}`)
    .setLabel('Add more info')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Primary);
