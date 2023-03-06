import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import * as dotenv from 'dotenv';

@Injectable()
export class DiscordBotService {
  constructor() {
    dotenv.config();
  }
  private readonly logger = new Logger(DiscordBotService.name);

  @Once('ready')
  public onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }

  @On('error')
  public onError(@Context() [error]: ContextOf<'error'>) {
    this.logger.error(error.message.toString());
  }
}
