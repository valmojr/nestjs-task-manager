import { Injectable } from '@nestjs/common';
import { Goal } from '@prisma/client';
import { PrismaService } from 'src/Database/Prisma.service';
import { randomUUID } from 'crypto';
import { GoalInput } from './entity/Goal.entity';

@Injectable()
export class GoalService {
  constructor(private readonly prisma: PrismaService) {}

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

  async findByUserId(id: string): Promise<Goal[]> {
    const userTasks = await this.prisma.task.findMany({
      where: { userId: id },
    });
    const tasksIdInGoal: string[] = [];

    userTasks.forEach((task) => {
      if (task.goalId) {
        tasksIdInGoal.push(task.goalId);
      }
    });

    return await this.prisma.goal.findMany({
      where: { id: { in: tasksIdInGoal } },
    });
  }

  async findByTaskId(id: string) {
    return await this.prisma.task.findMany({
      where: { goalId: id },
    });
  }

  async updateById(id: string, goal: GoalInput) {
    return await this.prisma.goal.update({
      where: { id },
      data: goal,
    });
  }

  async updateStatus(id: string) {
    const thisGoalTasks = await this.prisma.task.findMany({
      where: { goalId: id },
    });

    const thisGoalCompletedTasks = thisGoalTasks.filter(
      (task) => task.status === 'completed',
    );

    const status =
      !thisGoalCompletedTasks.length || !thisGoalTasks.length
        ? 0
        : Math.round(
            (thisGoalCompletedTasks.length / thisGoalTasks.length) * 100,
          );

    return await this.prisma.goal.update({
      where: { id },
      data: { status },
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
