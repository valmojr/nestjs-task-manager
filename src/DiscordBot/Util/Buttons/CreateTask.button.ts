import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default () =>
  new ButtonBuilder()
    .setCustomId('CreateTask')
    .setLabel('Create Task')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Primary);
