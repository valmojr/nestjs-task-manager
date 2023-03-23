import { ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';

export default (
  taskId: string,
  goalOptions: { label: string; value: string }[],
) =>
  new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`assignTaskToGoal/${taskId}`)
      .setPlaceholder('Assign to a goal')
      .setMaxValues(1)
      .setMinValues(1)
      .addOptions(goalOptions),
  );
