// dashboard confirm button
import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (guildId: string) =>
  new ButtonBuilder()
    .setCustomId(`ConfirmDashboardButton/${guildId}`)
    .setLabel('Confirm')
    .setEmoji('✅')
    .setStyle(ButtonStyle.Success);
