import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NecordModule } from 'necord';
import { GoalCommandsModule } from './Commands/Goal/GoalCommands.module';
import { TaskCommandsModule } from './Commands/Task/TaskCommands.module';
import { UserCommandsModule } from './Commands/User/UserCommands.module';
import { DiscordBotService } from './DiscordBot.service';
import { DiscordBotConfigService } from './DiscordBotConfig.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    NecordModule.forRootAsync({
      useClass: DiscordBotConfigService,
    }),
    GoalCommandsModule,
    TaskCommandsModule,
    UserCommandsModule,
  ],
  providers: [DiscordBotService],
})
export class DiscordBotModule {}
