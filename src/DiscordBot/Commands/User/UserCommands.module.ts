import { Module } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { RegisterAllGuildMembersCommand } from './RegisterAllGuildMembers.command.service';
import { RegisterUserCommand } from './RegisterUser.command.service';

@Module({
  providers: [
    PrismaService,
    UserService,
    GoalService,
    TaskService,
    RegisterAllGuildMembersCommand,
    RegisterUserCommand,
  ],
})
export class UserCommandsModule {}
