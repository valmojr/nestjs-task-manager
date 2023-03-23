import { Injectable, Logger } from '@nestjs/common';
import { Goal } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import { Modal, Ctx, ModalContext, ComponentParam } from 'necord';
import { GoalInput } from 'src/goal/entity/Goal.entity';
import { GoalService } from 'src/goal/goal.service';
import { TaskInput } from 'src/task/entity/Task.entity';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import AddMoreInfoToTaskButton from './Buttons/AddMoreInfoToTask.button';
import { EmbedGeneratorService } from './EmbedGenerator.service';

@Injectable()
export class ModalHandlersService {
  constructor(
    private readonly taskService: TaskService,
    private readonly goalService: GoalService,
    private readonly userService: UserService,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {}

  private logger = new Logger(ModalHandlersService.name);

  @Modal('createTask')
  async createTaskModalHandler(@Ctx() [interaction]: ModalContext) {
    const imputedTask: TaskInput = {
      title: interaction.fields.getTextInputValue('taskName'),
      description: interaction.fields.getTextInputValue('taskDescription'),
      image: interaction.fields.getTextInputValue('taskImage'),
    };

    const createdTask = await this.taskService.create(imputedTask);

    this.logger.log(`Task ${createdTask.title} created`);

    return interaction.reply({
      embeds: [await this.embedGeneratorService.createTaskEmbed(createdTask)],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          AddMoreInfoToTaskButton(createdTask.id),
        ),
      ],
      ephemeral: true,
    });
  }

  @Modal('editTaskModal/:value')
  async editTaskModalHandler(
    @Ctx() [interaction]: ModalContext,
    @ComponentParam('value') taskId: string,
  ) {
    const editedTask: TaskInput = {
      title: interaction.fields.getTextInputValue('taskName'),
      description: interaction.fields.getTextInputValue('taskDescription'),
      image: interaction.fields.getTextInputValue('taskImage'),
    };

    const createdTask = await this.taskService.updateById(taskId, editedTask);

    return interaction.reply({
      embeds: [await this.embedGeneratorService.createTaskEmbed(createdTask)],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          AddMoreInfoToTaskButton(createdTask.id),
        ),
      ],
      ephemeral: true,
    });
  }

  @Modal('createGoal')
  public async onGoalCreationModal(@Ctx() [interaction]: ModalContext) {
    const newGoal: GoalInput = {
      title: interaction.fields.getTextInputValue('title'),
      description: interaction.fields.getTextInputValue('description'),
      status: 0,
      image: interaction.fields.getTextInputValue('image'),
      dueDate: null,
    };

    const logger = new Logger('GoalCreatorHandler');

    let { description } = newGoal;

    if (newGoal.description === null) description = 'Description not provided';
    if (newGoal.status === null) newGoal.status = 0;

    const createdGoal = {
      title: newGoal.title,
      description,
      status: newGoal.status,
      image: newGoal.image,
      dueDate: newGoal.dueDate,
    };

    logger.log(`Goal ${createdGoal.title} created!`);

    const goalInDatabase: Goal = await this.goalService.create({
      ...createdGoal,
      id: randomUUID(),
    });

    return interaction.reply({
      embeds: [await this.embedGeneratorService.generate(goalInDatabase)],
    });
  }
}
