import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (guildId: string) =>
  new ButtonBuilder()
    .setCustomId(`DeleteTaskButton/${guildId}`)
    .setLabel('Delete Task')
    .setEmoji('🗑️')
    .setStyle(ButtonStyle.Danger);
