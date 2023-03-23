import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`UnassignTask/${taskId}`)
    .setLabel('Unassign')
    .setEmoji('👎')
    .setStyle(ButtonStyle.Secondary);
