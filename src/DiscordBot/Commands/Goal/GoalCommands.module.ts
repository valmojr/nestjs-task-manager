import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { AssignTaskToGoalCommand } from './AssignTaskToGoal/AssignTaskToGoal.command.service';
import { CheckGoalsCommand } from './CheckGoals/CheckGoals.command.service';
import { CreateGoalCommand } from './CreateGoal/CreateGoal.command.service';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';

@Module({
  imports: [],
  providers: [
    PrismaService,
    GoalService,
    UserService,
    TaskService,
    EmbedGeneratorService,
    CreateGoalCommand,
    AssignTaskToGoalCommand,
    CheckGoalsCommand,
  ],
})
export class GoalCommandsModule {}
