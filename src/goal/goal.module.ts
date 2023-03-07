import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { PrismaService } from 'src/Database/Prisma.service';

@Module({
  controllers: [GoalController],
  providers: [GoalService, PrismaService],
})
export class GoalModule {}
