import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { Task } from '.prisma/client';
import { randomUUID } from 'crypto';
@Injectable()
export class TaskService {
  private prisma: PrismaService;

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.prisma.task.findUnique({ where: { id } });
  }

  async createTask(task: Task | Omit<Task, 'id'>): Promise<Task> {
    return await this.prisma.task.create({
      data: {
        id: randomUUID(),
        title: task.title,
        description: task.description,
        status: task.status,
        userId: task.userId,
        image: task.image,
        dueDate: task.dueDate,
      },
    });
  }

  async updateTask(task: Task): Promise<Task> {
    return await this.prisma.task.update({
      where: { id: task.id },
      data: task,
    });
  }

  async finishTask(id: string) {
    return await this.prisma.task.update({
      where: { id },
      data: {
        status: 'done',
      },
    });
  }

  async deleteTask(id: string): Promise<Task> {
    return await this.prisma.task.delete({ where: { id } });
  }
}
