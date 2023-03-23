import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export default (goalId: string) =>
  new ModalBuilder()
    .setTitle('Edit Goal')
    .setCustomId(`editGoal/${goalId}`)
    .setComponents([
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setLabel('Title')
          .setCustomId('goalName')
          .setPlaceholder('Title')
          .setRequired(true)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setLabel('Description')
          .setCustomId('goalDescription')
          .setPlaceholder('Description')
          .setRequired(false)
          .setStyle(TextInputStyle.Paragraph),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setLabel('Image URL')
          .setCustomId('goalImage')
          .setPlaceholder('Image URL')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
    ]);
