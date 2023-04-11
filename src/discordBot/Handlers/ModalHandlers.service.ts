import { Injectable, Logger } from '@nestjs/common';
import { Ctx, Modal, ModalContext } from 'necord';

@Injectable()
export class ModalHandlersService {
  private logger = new Logger(ModalHandlersService.name);

  @Modal(`CustomizeBotModal/:guildId`)
  async customizeBotModal(@Ctx() [interaction]: ModalContext) {
    const username = interaction.fields.getTextInputValue(
      'discordBotDisplayName',
    );

    const avatar = interaction.fields.getTextInputValue(
      'discordBotDisplayImageURL',
    );

    if (avatar) {
      this.logger.log(
        `Setting bot avatar to ${avatar} in guild ${interaction.guild.id}`,
      );

      interaction.client.user.setAvatar(avatar);
    }
    if (username) {
      this.logger.log(
        `Setting bot username to ${username} in guild ${interaction.guild.id}`,
      );

      interaction.client.user.setUsername(username);
    }

    interaction.reply({
      content: 'Bot customization successful!',
      ephemeral: true,
    });
  }
}
