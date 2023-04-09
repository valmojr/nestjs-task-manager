import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NecordModule } from 'necord';
import { DiscordBotService } from './DiscordBot.service';
import { DiscordBotConfigService } from './DiscordBotConfig.service';
import { TaskModule } from 'src/task/task.module';
import { GuildModule } from 'src/guild/guild.module';
import { ReminderModule } from 'src/reminder/reminder.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NecordModule.forRootAsync({
      useClass: DiscordBotConfigService,
    }),
    GuildModule,
    ReminderModule,
    TaskModule,
    UserModule,
  ],
  providers: [DiscordBotService],
})
export class DiscordBotModule {}
