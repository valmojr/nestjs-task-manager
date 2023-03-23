import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

export default () =>
  new ModalBuilder()
    .setTitle('Create Task')
    .setCustomId('createTask')
    .setComponents([
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setLabel('Title')
          .setCustomId('taskName')
          .setPlaceholder('Title')
          .setRequired(true)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setLabel('Description')
          .setCustomId('taskDescription')
          .setPlaceholder('Description')
          .setRequired(false)
          .setStyle(TextInputStyle.Paragraph),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setLabel('Image URL')
          .setCustomId('taskImage')
          .setPlaceholder('Image URL')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
    ]);
