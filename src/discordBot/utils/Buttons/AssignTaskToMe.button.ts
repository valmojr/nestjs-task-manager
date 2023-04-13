import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (taskId: string) =>
  new ButtonBuilder()
    .setCustomId(`AssignTaskToMeButton/${taskId}`)
    .setLabel('Assign Task To Me')
    .setEmoji('📝')
    .setStyle(ButtonStyle.Secondary);
