import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`UpdateGoalStatus/${taskId}`)
    .setLabel('Update Status')
    .setEmoji('👍')
    .setStyle(ButtonStyle.Success);
