import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { TaskService } from 'src/task/task.service';
import { CreateTaskCommand } from './CreateTask.command.service';
import { PingCommand } from './Ping.command.service';

@Module({
  providers: [PrismaService, TaskService, CreateTaskCommand, PingCommand],
})
export class DiscordBotCommandsModule {}
