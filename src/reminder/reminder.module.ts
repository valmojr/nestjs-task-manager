import { Module } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { ReminderController } from './reminder.controller';
import { PrismaService } from 'src/Database/Database.service';

@Module({
  controllers: [ReminderController],
  providers: [ReminderService, PrismaService],
})
export class ReminderModule {}
