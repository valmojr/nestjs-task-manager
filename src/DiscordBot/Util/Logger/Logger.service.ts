import { Injectable, ConsoleLogger } from '@nestjs/common';

@Injectable()
export class DiscordLoggerService extends ConsoleLogger {
  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
  }
}
