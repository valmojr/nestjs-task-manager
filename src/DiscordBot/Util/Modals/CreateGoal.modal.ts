import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export default () =>
  new ModalBuilder()
    .setTitle('Create Goal')
    .setCustomId('createGoal')
    .setComponents([
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('title')
          .setLabel('Title')
          .setPlaceholder('Title')
          .setRequired(true)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('description')
          .setLabel('Description')
          .setPlaceholder('Description')
          .setRequired(true)
          .setStyle(TextInputStyle.Paragraph),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('image')
          .setLabel('Image URL')
          .setPlaceholder('Image URL')
          .setRequired(true)
          .setStyle(TextInputStyle.Short),
      ]),
    ]);
