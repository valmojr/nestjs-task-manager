import { Injectable } from '@nestjs/common';
import { Task } from '.prisma/client';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/Database/Prisma.service';

@Injectable()
export class TaskService {
  private prisma: PrismaService;

  async create(task: Task): Promise<Task> {
    return await this.prisma.task.create({
      data: {
        ...task,
        id: randomUUID(),
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findById(id: string): Promise<Task> {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async findByUserId(id: string): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { userId: id },
    });
  }

  async findByGoalId(id: string): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where: { goalId: id },
    });
  }

  async update(task: Task): Promise<Task> {
    return await this.prisma.task.update({
      where: { id: task.id },
      data: task,
    });
  }

  async updateById(id: string, task: Task): Promise<Task> {
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
}
