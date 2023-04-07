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
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  private readonly logger: Logger = new Logger(TaskController.name);

  @Post()
  create(@Body() task: Task) {
    this.logger.log(`Task controller creating task: ${task.title}`);

    return this.taskService.create(task);
  }

  @Get()
  findAll() {
    this.logger.log('Task controller finding all tasks');

    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Task controller finding task with id: ${id}`);

    return this.taskService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: Task) {
    this.logger.log(`
      Task controller updating task with id: ${id} and data: ${task}
    `);

    return this.taskService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`Task controller removing task with id: ${id}`);

    return this.taskService.remove(id);
  }
}
