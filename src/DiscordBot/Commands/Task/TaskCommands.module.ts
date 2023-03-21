import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { AssignTaskToUserCommand } from './AssignTaskToUser/AssignTaskToUser.command.service';
import { CheckMyTasksCommand } from './CheckMyTasks/CheckMyTasks.command.service';
import { CreateTaskCommand } from './CreateTask/CreateTask.command.service';
import { CreateTaskHandler } from './CreateTask/CreateTaskHandler.service';
import { CreateTaskModal } from './CreateTask/CreateTaskModal.service';
import { CreateTaskReceiver } from './CreateTask/CreateTaskReceiver.service';
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
    CreateTaskCommand,
    CreateTaskHandler,
    CreateTaskModal,
    CreateTaskReceiver,
    ListAllTasksCommand,
  ],
})
export class TaskCommandsModule {}