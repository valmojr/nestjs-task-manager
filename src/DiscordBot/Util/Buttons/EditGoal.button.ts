import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`EditGoal/${taskId}`)
    .setLabel('Edit')
    .setEmoji('✏️')
    .setStyle(ButtonStyle.Primary);
