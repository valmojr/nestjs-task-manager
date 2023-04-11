import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import CustomizeBotModal from 'src/discordBot/utils/Modal/CustomizeBot.modal';

@Injectable()
export class CustomizeBotCommandService {
  @SlashCommand({
    name: 'customize-bot',
    description: 'Customize the bot to your liking',
  })
  async customizeBot(@Context() [interaction]: SlashCommandContext) {
    return interaction.showModal(CustomizeBotModal(interaction.guild.id));
  }
}
