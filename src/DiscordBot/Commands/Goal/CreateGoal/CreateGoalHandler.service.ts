import { Injectable, Logger } from '@nestjs/common';
import { Goal } from '@prisma/client';
import { randomUUID } from 'crypto';
import { GoalInput } from 'src/goal/entity/Goal.entity';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class CreateGoalHandler {
  constructor(private readonly goalService: GoalService) {}

  async goalCreatorHandler(data: GoalInput, whoCreated: string): Promise<Goal> {
    const logger = new Logger('GoalCreatorHandler');

    let description = data.description;

    if (data.description === null) description = 'Description not provided';
    if (data.status === null) data.status = 0;

    const createdGoal = {
      title: data.title,
      description,
      status: data.status,
      image: data.image,
      dueDate: data.dueDate,
    };

    logger.log(`Goal ${data.title} created by ${whoCreated}!`);

    return await this.goalService.create({
      ...createdGoal,
      id: randomUUID(),
    });
  }
}
