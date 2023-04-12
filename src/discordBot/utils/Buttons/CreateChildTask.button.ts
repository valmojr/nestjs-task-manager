import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`CreateChildTaskButton/${taskId}`)
    .setLabel('Create Child Task')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Primary);
