import { Injectable } from '@nestjs/common';
import { Goal } from '.prisma/client';
import { PrismaService } from 'src/Database/Prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class GoalService {
  private prisma: PrismaService;

  async create(goal: Goal) {
    return await this.prisma.goal.create({
      data: {
        ...goal,
        id: randomUUID(),
      },
    });
  }

  async findAll() {
    return await this.prisma.goal.findMany();
  }

  async findById(id: string) {
    return await this.prisma.goal.findUnique({
      where: { id },
    });
  }

  async findByUserId(id: string) {
    return await this.prisma.goal.findMany({
      where: { id },
    });
  }

  async findByTaskId(id: string) {
    return await this.prisma.goal.findMany({
      where: { id },
    });
  }

  async updateById(id: string, goal: Goal) {
    return await this.prisma.goal.update({
      where: { id },
      data: goal,
    });
  }

  async update(goal: Goal) {
    return await this.prisma.goal.update({
      where: { id: goal.id },
      data: goal,
    });
  }

  async remove(goal: Goal) {
    return await this.prisma.goal.delete({
      where: { id: goal.id },
    });
  }

  async removeById(id: string) {
    return await this.prisma.goal.delete({
      where: { id },
    });
  }
}
