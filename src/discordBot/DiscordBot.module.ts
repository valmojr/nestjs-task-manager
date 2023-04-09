import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NecordModule } from 'necord';
import { DiscordBotService } from './DiscordBot.service';
import { DiscordBotConfigService } from './DiscordBotConfig.service';
import { PrismaService } from 'src/Database/Database.service';
import { TaskService } from 'src/task/task.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { UserService } from 'src/user/user.service';
import { GuildService } from 'src/guild/guild.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NecordModule.forRootAsync({
      useClass: DiscordBotConfigService,
    }),
  ],
  providers: [
    DiscordBotService,
    PrismaService,
    TaskService,
    ReminderService,
    UserService,
    GuildService,
  ],
})
export class DiscordBotModule {}
