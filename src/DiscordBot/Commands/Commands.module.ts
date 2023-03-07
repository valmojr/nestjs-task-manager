import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { TaskService } from 'src/task/task.service';
import { CreateTaskCommand } from './Task/CreateTask/CreateTask.command.service';
import { PingCommand } from './Ping.command.service';
import { CreateTaskHandler } from './Task/CreateTask/CreateTaskHandler.service';
import { CreateTaskModal } from './Task/CreateTask/CreateTaskModal.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    TaskService,
    CreateTaskCommand,
    PingCommand,
    CreateTaskHandler,
    CreateTaskModal,
  ],
})
export class DiscordBotCommandsModule {}
