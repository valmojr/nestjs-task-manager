import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { AssignTaskToGoalCommand } from './AssignTaskToGoal/AssignTaskToGoal.command.service';
import { AssignTaskToUserCommand } from './AssignTaskToUser/AssignTaskToUser.command.service';
import { CheckMyTasksCommand } from './CheckMyTasks/CheckMyTasks.command.service';
import { CreateTaskCommand } from './CreateTask/CreateTask.command.service';
import { CreateTaskHandler } from './CreateTask/CreateTaskHandler.service';
import { CreateTaskModal } from './CreateTask/CreateTaskModal.service';
import { ListAllTasksCommand } from './ListAllTasks/ListAllTasks.command.service';
import { EmbedTaskService } from './util/embedTask.service';
import { StatusAutoCompleteInterceptor } from './util/status.interceptor.service';
import { StatusColorPicker } from './util/statuscolors.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    GoalService,
    UserService,
    TaskService,
    EmbedTaskService,
    StatusAutoCompleteInterceptor,
    StatusColorPicker,
    AssignTaskToUserCommand,
    AssignTaskToGoalCommand,
    CheckMyTasksCommand,
    CreateTaskCommand,
    CreateTaskHandler,
    CreateTaskModal,
    ListAllTasksCommand,
  ],
})
export class TaskCommandsModule {}
