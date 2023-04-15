import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`CreateChildTaskButton/${taskId}`)
    .setLabel('Create Subtask')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Success);
