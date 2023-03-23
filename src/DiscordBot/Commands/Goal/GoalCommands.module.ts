import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { AssignTaskToGoalCommand } from './AssignTaskToGoal/AssignTaskToGoal.command.service';
import { CheckGoalsCommand } from './CheckGoals/CheckGoals.command.service';
import { CreateGoalCommand } from './CreateGoal/CreateGoal.command.service';
import { CreateGoalHandler } from './CreateGoal/CreateGoalHandler.service';
import { CreateGoalModal } from './CreateGoal/CreateGoalModal.service';
import { DashboardCommandService } from './Dashboard/Dashboard.command.service';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { DashboardSenderService } from './Dashboard/DashboardSender.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    GoalService,
    UserService,
    TaskService,
    EmbedGeneratorService,
    CreateGoalCommand,
    CreateGoalHandler,
    CreateGoalModal,
    AssignTaskToGoalCommand,
    CheckGoalsCommand,
    DashboardCommandService,
    DashboardSenderService,
  ],
})
export class GoalCommandsModule {}
