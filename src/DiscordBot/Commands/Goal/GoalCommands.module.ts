import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/Goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';

@Module({
  imports: [],
  providers: [PrismaService, TaskService, UserService, GoalService],
})
export class GoalCommandsModule {}
