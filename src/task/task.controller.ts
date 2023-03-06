import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Task } from '@prisma/client';
import { TaskService } from './task.service';
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllUsers(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createUser(@Body() data: Task | Omit<Task, 'id'>): Promise<Task> {
    return this.taskService.createTask(data);
  }

  @Patch()
  async updateUser(@Body() data: Task): Promise<Task> {
    return this.taskService.updateTask(data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
