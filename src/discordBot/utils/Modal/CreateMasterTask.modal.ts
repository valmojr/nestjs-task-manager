import { ModalBuilder } from 'discord.js';
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default (guildId: string) =>
  new ModalBuilder()
    .setTitle('Create Master Task')
    .setCustomId(`CreateMasterTaskModal/${guildId}`)
    .setComponents([
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('taskTitle')
          .setLabel('Title')
          .setPlaceholder('title')
          .setRequired(true)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('taskDescription')
          .setLabel('Description')
          .setPlaceholder('description')
          .setRequired(false)
          .setStyle(TextInputStyle.Paragraph),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('taskImage')
          .setLabel('Image URL')
          .setPlaceholder('image URL')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
    ]);
