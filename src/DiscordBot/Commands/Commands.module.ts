import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { TaskService } from 'src/task/task.service';
import { CreateTaskCommand } from './Task/CreateTask/CreateTask.command.service';
import { PingCommand } from './Ping.command.service';
import { CreateTaskHandler } from './Task/CreateTask/CreateTaskHandler.service';
import { CreateTaskModal } from './Task/CreateTask/CreateTaskModal.service';
import { CheckMyTasksCommand } from './Task/CheckMyTasks/CheckMyTasks.command.service';
import { AssignTaskToUserCommand } from './Task/AssignTaskToUser/AssignTaskToUser.command.service';
import { UserService } from 'src/User/user.service';
import { GoalService } from 'src/goal/goal.service';
import { RegisterAllGuildMembersCommand } from './User/RegisterAllGuildMembers.command.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    TaskService,
    UserService,
    GoalService,
    CreateTaskCommand,
    AssignTaskToUserCommand,
    RegisterAllGuildMembersCommand,
    CheckMyTasksCommand,
    PingCommand,
    CreateTaskHandler,
    CreateTaskModal,
  ],
})
export class DiscordBotCommandsModule {}
