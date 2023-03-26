import { ButtonBuilder, ButtonStyle } from 'discord.js';

export default (goalId: string) =>
  new ButtonBuilder()
    .setCustomId(`CheckMissingGoalTasks/${goalId}`)
    .setLabel('Check Tasks')
    .setEmoji('📋')
    .setStyle(ButtonStyle.Secondary);
