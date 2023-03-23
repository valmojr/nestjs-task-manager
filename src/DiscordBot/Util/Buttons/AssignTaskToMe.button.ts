import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`AssignTaskToMe/${taskId}`)
    .setLabel('Claim')
    .setEmoji('👍')
    .setStyle(ButtonStyle.Primary);
