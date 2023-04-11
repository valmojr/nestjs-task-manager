import { ModalBuilder } from 'discord.js';
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default (guildId: string) =>
  new ModalBuilder()
    .setTitle('Customize Bot')
    .setCustomId(`CustomizeBotModal/${guildId}`)
    .setComponents([
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('discordBotDisplayName')
          .setLabel('Bot Display Name')
          .setPlaceholder('Collabore')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
    ]);
