import { Injectable } from '@nestjs/common';
import { Goal, Task } from '@prisma/client';
import AddMoreInfoToTaskButton from '../Buttons/AddMoreInfoToTask.button';
import AssignTaskToMeButton from '../Buttons/AssignTaskToMe.button';
import CompleteTaskButtonButton from '../Buttons/CompleteTaskButton.button';
import DeleteGoalButton from '../Buttons/DeleteGoalButton';
import DeleteTaskButton from '../Buttons/DeleteTaskButton';
import EditGoalButton from '../Buttons/EditGoal.button';
import EditTaskButton from '../Buttons/EditTask.button';
import UnassignTaskButton from '../Buttons/UnassignTask.button';
import UpdateGoalStatusButton from '../Buttons/UpdateGoalStatus.button';
import _ButtonRow from '../Buttons/_ButtonRow';
import { EmbedGeneratorService } from '../EmbedGenerator.service';
import { StatusColorPicker } from '../StatusColorPicker.service';

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

  public async generateGoalMessage([interaction]: any, goal: Goal) {
    await interaction.channel.send({
      content: `**Goal:** ${goal.title}\n\n${StatusColorPicker.getGoalEmoji(
        goal.status,
      )} - ${goal.status}%\n\n`,
      embeds: [await this.generate(goal)],
      components: [
        _ButtonRow([
          UpdateGoalStatusButton(goal.id),
          EditGoalButton(goal.id),
          DeleteGoalButton(goal.id),
        ]),
      ],
    });
  }

  public async editGoalMessage([interaction]: any, goal: Goal) {
    await interaction.message.edit({
      content: `**Goal:** ${goal.title}\n\n${StatusColorPicker.getGoalEmoji(
        goal.status,
      )}\n\n`,
      embeds: [await this.generate(goal)],
      components: [
        _ButtonRow([
          UpdateGoalStatusButton(goal.id),
          EditGoalButton(goal.id),
          DeleteGoalButton(goal.id),
        ]),
      ],
    });
  }
}
