import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { TaskService } from 'src/task/task.service';
import { CreateTaskCommand } from './Task/CreateTask/CreateTask.command.service';
import { PingCommand } from './Ping.command.service';
import { CreateTaskHandler } from './Task/CreateTask/CreateTaskHandler.service';
import { CreateTaskModal } from './Task/CreateTask/CreateTaskModal.service';
import { CheckMyTasksCommand } from './Task/CheckMyTasks/CheckMyTasks.command.service';
import { AssignTaskToUserCommand } from './Task/AssignTaskToUser/AssignTaskToUser.command.service';
import { AssignTaskToGoalCommand } from './Task/AssignTaskToGoal/AssignTaskToGoal.command.service';
import { UserService } from 'src/User/user.service';
import { GoalService } from 'src/goal/goal.service';
import { RegisterAllGuildMembersCommand } from './User/RegisterAllGuildMembers.command.service';
import { ListAllTasksCommand } from './Task/ListAllTasks/ListAllTasks.command.service';
import { CreateGoalCommand } from './Goal/CreateGoal/CreateGoal.command.service';
import { HelpCommand } from './Help.command.service';
import { RegisterUserCommand } from './User/RegisterUser.command.service';
import { CreateGoalHandler } from './Goal/CreateGoal/CreateGoalHandler.service';
import { CreateGoalModal } from './Goal/CreateGoal/CreateGoalModal.service';

@Module({
  imports: [],
  providers: [
    PingCommand,
    HelpCommand,
    RegisterAllGuildMembersCommand,
    RegisterUserCommand,
    // Task Commands
    CreateTaskCommand,
    AssignTaskToUserCommand,
    AssignTaskToGoalCommand,
    CheckMyTasksCommand,
    ListAllTasksCommand,
    CreateTaskHandler,
    CreateTaskModal,

    // Goal Commands
    CreateGoalCommand,
    CreateGoalHandler,
    CreateGoalModal,

    PrismaService,
    TaskService,
    UserService,
    GoalService,
  ],
})
export class DiscordBotCommandsModule {}
