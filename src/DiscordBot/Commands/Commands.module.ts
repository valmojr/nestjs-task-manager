import { Module } from '@nestjs/common';
import { GoalCommandsModule } from './Goal/GoalCommands.module';
import { TaskCommandsModule } from './Task/TaskCommands.module';
import { UserCommandsModule } from './User/UserCommands.module';

@Module({
  imports: [GoalCommandsModule, TaskCommandsModule, UserCommandsModule],
  providers: [],
})
export class DiscordBotCommandsModule {}
