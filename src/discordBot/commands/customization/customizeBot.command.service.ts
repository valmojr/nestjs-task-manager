import { Injectable } from '@nestjs/common';
import { SlashCommand } from 'necord';

@Injectable()
export class CustomizeBotCommandService {
  @SlashCommand({
    name: 'customize-bot',
    description: 'Customize the bot to your liking',
  })
  async customizeBot() {
    return 'This action returns all user';
  }
}
