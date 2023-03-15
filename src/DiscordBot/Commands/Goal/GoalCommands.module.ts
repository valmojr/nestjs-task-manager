import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { CheckGoalsCommand } from './CheckGoals/CheckGoals.command.service';
import { CreateGoalCommand } from './CreateGoal/CreateGoal.command.service';
import { CreateGoalHandler } from './CreateGoal/CreateGoalHandler.service';
import { CreateGoalModal } from './CreateGoal/CreateGoalModal.service';
import { EmbedGoalService } from './util/EmbedGoal.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    GoalService,
    UserService,
    TaskService,
    CreateGoalCommand,
    CreateGoalHandler,
    CreateGoalModal,
    EmbedGoalService,
    CheckGoalsCommand,
  ],
})
export class GoalCommandsModule {}
