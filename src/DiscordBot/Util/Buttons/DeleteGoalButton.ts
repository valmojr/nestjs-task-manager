import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (goalId: string) =>
  new ButtonBuilder()
    .setCustomId(`DeleteGoal/${goalId}`)
    .setLabel('Delete')
    .setEmoji('🗑️')
    .setStyle(ButtonStyle.Danger);
