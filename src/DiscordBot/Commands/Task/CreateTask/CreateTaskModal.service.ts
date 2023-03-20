import { Task } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Modal, Ctx, ModalContext } from 'necord';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { CreateTaskHandler } from './CreateTaskHandler.service';
import { TaskInput } from 'src/task/entity/Task.entity';
import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  UserSelectMenuBuilder,
} from 'discord.js';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class CreateTaskModal {
  constructor(
    private readonly goalService: GoalService,
    private createTaskHandler: CreateTaskHandler,
  ) {}

  @Modal('taskcreationmodal')
  public async onTaskCreationModal(@Ctx() [interaction]: ModalContext) {
    const newTask: TaskInput = {
      title: interaction.fields.getTextInputValue('title'),
      description: interaction.fields.getTextInputValue('description'),
      status: 'not_assigned',
      userId: null,
      image: interaction.fields.getTextInputValue('image'),
      dueDate: null,
      goalId: interaction.fields.getTextInputValue('goalId'),
    };

    const taskInDatabase: Task =
      await this.createTaskHandler.taskCreatorHandler(
        newTask,
        interaction.user.username,
      );

    const avaliableGoals = await this.goalService.findAll();

    const goalOptions = avaliableGoals.map((goal) => {
      return {
        label: goal.title,
        value: goal.id,
      };
    });

    return interaction.reply({
      embeds: [EmbedGeneratorService.createTaskEmbed(taskInDatabase)],
      components: [
        new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
          new UserSelectMenuBuilder()
            .setCustomId(`ContextMenuAssignTaskToUser/${taskInDatabase.id}`)
            .setMaxValues(1)
            .setMinValues(1)
            .setPlaceholder('Assign task to user'),
        ),
        new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId(`ContextMenuAssignTaskToGoal/${taskInDatabase.id}`)
            .setPlaceholder('Assign task to goal')
            .setMaxValues(1)
            .setMinValues(1)
            .addOptions(goalOptions),
        ),
      ],
      ephemeral: true,
    });
  }
}
