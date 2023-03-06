import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from '@prisma/client';
import { TaskService } from './task.service';
@Controller('task')
@UseGuards(AuthGuard('discord'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllUsers(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  async createUser(@Body() data: Task): Promise<Task> {
    return this.taskService.createTask(
      data.id,
      data.title,
      data.description,
      data.status,
    );
  }

  @Patch()
  async updateUser(@Body() data: Task): Promise<Task> {
    return this.taskService.createTask(
      data.id,
      data.title,
      data.description,
      data.status,
    );
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<Task> {
    return this.taskService.deleteTask(id);
  }
}
