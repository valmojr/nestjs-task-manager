import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { DashboardSenderService } from '../Goal/Dashboard/DashboardSender.service';
import { AssignTaskToUserCommand } from './AssignTaskToUser/AssignTaskToUser.command.service';
import { CheckMyTasksCommand } from './CheckMyTasks/CheckMyTasks.command.service';
import { CreateTaskCommandService } from './CreateTasks/CreateTask.command.service';
import { ListAllTasksCommand } from './ListAllTasks/ListAllTasks.command.service';
import { StatusAutoCompleteInterceptor } from './status.interceptor.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    GoalService,
    UserService,
    TaskService,
    StatusAutoCompleteInterceptor,
    AssignTaskToUserCommand,
    CheckMyTasksCommand,
    CreateTaskCommandService,
    ListAllTasksCommand,
    EmbedGeneratorService,
    DashboardSenderService,
  ],
})
export class TaskCommandsModule {}
