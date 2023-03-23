import { ButtonStyle, ButtonBuilder } from 'discord.js';

export default () =>
  new ButtonBuilder()
    .setCustomId('dashboardDenyCreation')
    .setLabel('Deny')
    .setEmoji('❌')
    .setStyle(ButtonStyle.Danger);
