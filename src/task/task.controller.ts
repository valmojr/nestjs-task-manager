import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Task } from '.prisma/client';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  @Get()
  async findAll() {
    return await this.taskService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Task> {
    return this.taskService.findById(id);
  }

  @Get('user/:id')
  findByUserId(@Param('id') id: string): Promise<Task[]> {
    return this.taskService.findByUserId(id);
  }

  @Get('goal/:id')
  findByGoalId(@Param('id') id: string): Promise<Task[]> {
    return this.taskService.findByGoalId(id);
  }

  @Patch()
  update(@Body() task: Task): Promise<Task> {
    return this.taskService.update(task);
  }

  @Patch(':id')
  updateById(@Param('id') id: string, @Body() task: Task): Promise<Task> {
    return this.taskService.updateById(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Task> {
    return this.taskService.removeById(id);
  }

  @Delete()
  removeById(@Body() task: Task): Promise<Task> {
    return this.taskService.remove(task);
  }
}
