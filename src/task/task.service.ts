import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/Database/Prisma.service';
import { TaskInput } from './entity/Task.entity';
@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async create(task: TaskInput): Promise<Task> {
    return await this.prisma.task.create({
      data: {
        ...task,
        id: randomUUID(),
      },
    });
  }

  async findAll(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async findById(id: string): Promise<Task> {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findByGoalId(goalId: string): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { goalId },
    });
  }

  async update(task: TaskInput): Promise<Task> {
    return await this.prisma.task.update({
      where: { id: task.id },
      data: task,
    });
  }

  async updateById(id: string, task: TaskInput): Promise<Task> {
    return await this.prisma.task.update({
      where: { id },
      data: task,
    });
  }

  async remove(task: Task): Promise<Task> {
    return await this.prisma.task.delete({
      where: { id: task.id },
    });
  }

  async removeById(id: string): Promise<Task> {
    return await this.prisma.task.delete({
      where: { id },
    });
  }

  async assignTaskToUser(taskId: string, userId: string): Promise<Task> {
    return await this.prisma.task.update({
      where: { id: taskId },
      data: { userId, status: 'pending' },
    });
  }

  async unassignTaskToUser(taskId: string): Promise<Task> {
    return await this.prisma.task.update({
      where: { id: taskId },
      data: { userId: null, status: 'not_assigned' },
    });
  }

  async assignTaskToGoal(taskId: string, goalId: string): Promise<Task> {
    const task = await this.findById(taskId);
    let status: 'pending' | 'not_assigned';
    task.userId ? (status = 'pending') : (status = 'not_assigned');

    return await this.prisma.task.update({
      where: { id: taskId },
      data: { goalId, status },
    });
  }

  async unassignTaskToGoal(taskId: string): Promise<Task> {
    return await this.prisma.task.update({
      where: { id: taskId },
      data: { goalId: null },
    });
  }

  async completeTask(taskId: string): Promise<Task> {
    return await this.prisma.task.update({
      where: { id: taskId },
      data: { status: 'completed' },
    });
  }
}
