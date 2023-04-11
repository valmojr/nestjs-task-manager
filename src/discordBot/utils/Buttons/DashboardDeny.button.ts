// Deny dashboard button
import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (guildId: string) =>
  new ButtonBuilder()
    .setCustomId(`DenyDashboard/${guildId}`)
    .setLabel('Deny')
    .setEmoji('❌')
    .setStyle(ButtonStyle.Danger);
