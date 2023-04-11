import { ModalBuilder } from 'discord.js';
import { ActionRowBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default (guildId: string) =>
  new ModalBuilder()
    .setTitle('Set Dashboard Update Frequency')
    .setCustomId(`SetDashboardFrequencyModal/${guildId}`)
    .setComponents([
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('eachSeconds')
          .setLabel('every second')
          .setPlaceholder('*')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('eachMinutes')
          .setLabel('every minute')
          .setPlaceholder('*')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('eachHours')
          .setLabel('every hour')
          .setPlaceholder('*')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('eachDaysOfMonth')
          .setLabel('every day of month')
          .setPlaceholder('*')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
      new ActionRowBuilder<TextInputBuilder>().addComponents([
        new TextInputBuilder()
          .setCustomId('eachMonths')
          .setLabel('every month')
          .setPlaceholder('*')
          .setRequired(false)
          .setStyle(TextInputStyle.Short),
      ]),
    ]);

//    * * * * * *
//    | | | | | |
//    | | | | | day of week
//    | | | | months
//    | | | day of month
//    | | hours
//    | minutes
//    seconds (optional)
