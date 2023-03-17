import { Module } from '@nestjs/common/decorators/modules/module.decorator';
import { ScheduleModule } from '@nestjs/schedule';
import { DashboardGoalReminderHandler } from './DashboardHandler.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [DashboardGoalReminderHandler],
})
export class RemindersModule {}
