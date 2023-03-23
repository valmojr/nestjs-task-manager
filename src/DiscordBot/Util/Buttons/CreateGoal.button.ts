import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default () =>
  new ButtonBuilder()
    .setCustomId('CreateGoal')
    .setLabel('Create Goal')
    .setEmoji('🎯')
    .setStyle(ButtonStyle.Success);
