import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (guildId: string) =>
  new ButtonBuilder()
    .setCustomId(`CreateMasterTaskButton/${guildId}`)
    .setLabel('Create Task')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Primary);
