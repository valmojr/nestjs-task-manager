import { ActionRowBuilder, ButtonBuilder } from 'discord.js';

export default (buttons: ButtonBuilder[]) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(buttons);
