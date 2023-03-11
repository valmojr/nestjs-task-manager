import { Goal, Task } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Modal, Ctx, ModalContext } from 'necord';
import { EmbedTaskService } from 'src/DiscordBot/Commands/Task/util/embedTask.service';
import { TaskInput } from 'src/task/entity/Task.entity';
import { CreateGoalHandler } from './CreateGoalHandler.service';
import { GoalInput } from 'src/goal/entity/Goal.entity';

@Injectable()
export class CreateTaskModal extends CreateGoalHandler {
  @Modal('goalcreationmodal')
  public async onGoalCreationModal(@Ctx() [interaction]: ModalContext) {
    const newTask: GoalInput = {
      title: interaction.fields.getTextInputValue('title'),
      description: interaction.fields.getTextInputValue('description'),
      status: '0',
      image: interaction.fields.getTextInputValue('image'),
      dueDate: null,
    };

    const taskInDatabase: Goal = await this.goalCreatorHandler(
      newTask,
      interaction.user.id,
    );

    return interaction.reply({
      embeds: [EmbedTaskService.createTaskEmbed(taskInDatabase)],
    });
  }
}
