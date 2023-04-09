import { Module } from '@nestjs/common';
import { GuildModule } from './guild/guild.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ReminderModule } from './reminder/reminder.module';
import { DiscordBotModule } from './discordBot/DiscordBot.module';

@Module({
  imports: [
    GuildModule,
    ReminderModule,
    UserModule,
    TaskModule,
    DiscordBotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
