import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { Task } from '@prisma/client';
@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async createTask(
    id: number,
    title: string,
    description: string,
    status?: string,
    userId?: string,
    image?: string,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        id,
        title,
        description,
        status,
        userId,
        image,
      },
    });
  }

  async createTaskByTaskObject(task: Task): Promise<Task> {
    return this.prisma.task.create({
      data: task,
    });
  }

  async updateTask(
    id: number,
    title: string,
    description: string,
    status?: string,
    userId?: string,
    image?: string,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: {
        id,
        title,
        description,
        status,
        userId,
        image,
      },
    });
  }

  async finishTask(id: number) {
    return this.prisma.task.update({
      where: { id },
      data: {
        status: 'completed',
      },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
