import { ButtonStyle, ButtonBuilder } from 'discord.js';

export default () =>
  new ButtonBuilder()
    .setCustomId('dashboardConfirmCreation')
    .setLabel('Confirm')
    .setEmoji('✅')
    .setStyle(ButtonStyle.Success);
