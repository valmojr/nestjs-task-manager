import { ActionRowBuilder, UserSelectMenuBuilder } from 'discord.js';

export default (taskId: string) =>
  new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
    new UserSelectMenuBuilder()
      .setCustomId(`assignTaskToUser/${taskId}`)
      .setPlaceholder('Assign to anyone')
      .setMaxValues(1)
      .setMinValues(1),
  );
