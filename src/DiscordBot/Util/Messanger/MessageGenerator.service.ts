import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import AddMoreInfoToTaskButton from '../Buttons/AddMoreInfoToTask.button';
import AssignTaskToMeButton from '../Buttons/AssignTaskToMe.button';
import CompleteTaskButtonButton from '../Buttons/CompleteTaskButton.button';
import DeleteTaskButton from '../Buttons/DeleteTaskButton';
import EditTaskButton from '../Buttons/EditTask.button';
import UnassignTaskButton from '../Buttons/UnassignTask.button';
import _ButtonRow from '../Buttons/_ButtonRow';
import { EmbedGeneratorService } from '../EmbedGenerator.service';

@Injectable()
export class MessageGeneratorService extends EmbedGeneratorService {
  public async generateTaskMessage([interaction]: any, task: Task) {
    if (!task.userId) {
      return await interaction.channel.send({
        embeds: [await this.createTaskEmbed(task)],
        components: [
          _ButtonRow([
            AssignTaskToMeButton(task.id),
            EditTaskButton(task.id),
            AddMoreInfoToTaskButton(task.id),
            CompleteTaskButtonButton(task.id),
            DeleteTaskButton(task.id),
          ]),
        ],
      });
    } else {
      return await interaction.channel.send({
        content: `Task: ${task.title} assigned to <@${task.userId}>\n\n`,
        embeds: [await this.createTaskEmbed(task)],
        components: [
          _ButtonRow([
            UnassignTaskButton(task.id),
            EditTaskButton(task.id),
            CompleteTaskButtonButton(task.id),
            DeleteTaskButton(task.id),
          ]),
        ],
      });
    }
  }

  public async editTaskMessage([interaction]: any, task: Task) {
    if (!task.userId) {
      return await interaction.message.edit({
        embeds: [await this.createTaskEmbed(task)],
        components: [
          _ButtonRow([
            AssignTaskToMeButton(task.id),
            EditTaskButton(task.id),
            AddMoreInfoToTaskButton(task.id),
            CompleteTaskButtonButton(task.id),
            DeleteTaskButton(task.id),
          ]),
        ],
      });
    } else {
      return await interaction.message.edit({
        content: `Task: ${task.title} assigned to <@${task.userId}>\n\n`,
        embeds: [await this.createTaskEmbed(task)],
        components: [
          _ButtonRow([
            UnassignTaskButton(task.id),
            EditTaskButton(task.id),
            CompleteTaskButtonButton(task.id),
            DeleteTaskButton(task.id),
          ]),
        ],
      });
    }
  }
}
