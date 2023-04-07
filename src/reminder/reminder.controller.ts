import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { Reminder } from '@prisma/client';

@Controller('reminder')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}
  private readonly logger: Logger = new Logger(ReminderController.name);

  @Post()
  create(@Body() reminder: Reminder) {
    this.logger.log(`Reminder controller creating reminder: ${reminder.title}`);

    return this.reminderService.create(reminder);
  }

  @Get()
  findAll() {
    this.logger.log('Reminder controller finding all reminders');

    return this.reminderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Reminder controller finding reminder with id: ${id}`);

    return this.reminderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() reminder: Reminder) {
    this.logger.log(`
      Reminder controller updating reminder with id: ${id} and data: ${reminder}
    `);

    return this.reminderService.update(id, reminder);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Reminder controller removing reminder with id: ${id}`);

    return this.reminderService.remove(id);
  }
}
