import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`CompleteTaskButton/${taskId}`)
    .setLabel('Complete Task')
    .setEmoji('✅')
    .setStyle(ButtonStyle.Success);
