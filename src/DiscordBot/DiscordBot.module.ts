import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import { GoalCommandsModule } from './Commands/Goal/GoalCommands.module';
import { TaskCommandsModule } from './Commands/Task/TaskCommands.module';
import { UserCommandsModule } from './Commands/User/UserCommands.module';
import { DiscordBotService } from './DiscordBot.service';
import { DiscordBotConfigService } from './DiscordBotConfig.service';
import { RemindersModule } from './Reminders/Reminders.module';

@Module({
  imports: [
    NecordModule.forRootAsync({
      useClass: DiscordBotConfigService,
    }),
    GoalCommandsModule,
    TaskCommandsModule,
    UserCommandsModule,
    RemindersModule,
  ],
  providers: [DiscordBotService],
})
export class DiscordBotModule {}
