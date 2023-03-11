import { Task } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Modal, Ctx, ModalContext } from 'necord';
import { EmbedTaskService } from 'src/DiscordBot/Commands/Task/util/embedTask.service';
import { CreateTaskHandler } from './CreateTaskHandler.service';
import { TaskInput } from 'src/task/entity/Task.entity';

@Injectable()
export class CreateTaskModal extends CreateTaskHandler {
  @Modal('taskcreationmodal')
  public async onTaskCreationModal(@Ctx() [interaction]: ModalContext) {
    const newTask: TaskInput = {
      title: interaction.fields.getTextInputValue('title'),
      description: interaction.fields.getTextInputValue('description'),
      status: 'not_assigned',
      userId: null,
      image: interaction.fields.getTextInputValue('image'),
      dueDate: null,
      goalId: null,
    };

    const taskInDatabase: Task = await this.taskCreatorHandler(
      newTask,
      interaction.user.id,
    );

    return interaction.reply({
      embeds: [EmbedTaskService.createTaskEmbed(taskInDatabase)],
    });
  }
}
