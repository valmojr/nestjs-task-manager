import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DashboardGoalReminderHandler {
  private logger = new Logger(DashboardGoalReminderHandler.name);

  @Cron(CronExpression.EVERY_SECOND)
  public async handleCron() {
    this.logger.log('beep');
  }
}
