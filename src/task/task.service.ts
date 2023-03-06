import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/Prisma.service';
import { STATUS, Task } from '.prisma/client';
@Injectable()
export class TaskService {
  private prisma: PrismaService;

  public async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  public async getTaskById(id: number): Promise<Task> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  public async createTask(
    title: string,
    description: string,
    status?: STATUS,
    userId?: string,
    image?: string,
  ): Promise<Task> {
    return this.prisma.task.create({
      data: {
        title,
        description,
        status,
        userId,
        image,
      },
    });
  }

  public async updateTask(
    id: number,
    title: string,
    description: string,
    status?: STATUS,
    userId?: string,
    image?: string,
  ): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        userId,
        image,
      },
    });
  }

  public async finishTask(id: number) {
    return this.prisma.task.update({
      where: { id },
      data: {
        status: 'done',
      },
    });
  }

  public async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }
}
