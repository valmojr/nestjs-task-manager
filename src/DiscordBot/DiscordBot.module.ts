import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { NecordModule } from 'necord';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { GoalCommandsModule } from './Commands/Goal/GoalCommands.module';
import { TaskCommandsModule } from './Commands/Task/TaskCommands.module';
import { UserCommandsModule } from './Commands/User/UserCommands.module';
import { DiscordBotService } from './DiscordBot.service';
import { DiscordBotConfigService } from './DiscordBotConfig.service';
import { EmbedGeneratorService } from './Util/EmbedGenerator.service';
import { MessageComponentHandlersService } from './Util/MessageComponentHandlers.service';
import { ModalHandlersService } from './Util/ModalHandlers.service';

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
  providers: [
    DiscordBotService,
    TaskService,
    GoalService,
    UserService,
    PrismaService,
    EmbedGeneratorService,
    MessageComponentHandlersService,
    ModalHandlersService,
  ],
})
export class DiscordBotModule {}
