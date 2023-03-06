import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext } from 'necord';

@Injectable()
export class PingCommand {
  @SlashCommand({
    name: 'ping',
    description: 'Ping!',
  })
  public async ping(@Context() [message]: SlashCommandContext) {
    await message.reply('Pong!');
  }
}
