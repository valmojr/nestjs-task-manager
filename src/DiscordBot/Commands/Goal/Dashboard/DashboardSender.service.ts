import { Injectable } from '@nestjs/common';
import { Goal, Task } from '@prisma/client';
import AddMoreInfoToTaskButton from 'src/DiscordBot/Util/Buttons/AddMoreInfoToTask.button';
import AssignTaskToMeButton from 'src/DiscordBot/Util/Buttons/AssignTaskToMe.button';
import CompleteTaskButtonButton from 'src/DiscordBot/Util/Buttons/CompleteTaskButton.button';
import CreateGoalButton from 'src/DiscordBot/Util/Buttons/CreateGoal.button';
import CreateTaskButton from 'src/DiscordBot/Util/Buttons/CreateTask.button';
import DeleteGoalButton from 'src/DiscordBot/Util/Buttons/DeleteGoalButton';
import DeleteTaskButton from 'src/DiscordBot/Util/Buttons/DeleteTaskButton';
import EditGoalButton from 'src/DiscordBot/Util/Buttons/EditGoal.button';
import EditTaskButton from 'src/DiscordBot/Util/Buttons/EditTask.button';
import UnassignTaskButton from 'src/DiscordBot/Util/Buttons/UnassignTask.button';
import _ButtonRow from 'src/DiscordBot/Util/Buttons/_ButtonRow';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';

@Injectable()
export class DashboardSenderService extends EmbedGeneratorService {
  public async overview([interaction]: any, goals: Goal[], tasks: Task[]) {
    await interaction.channel.setName(`dashboard`);

    await interaction.channel.send({
      content: `**${interaction.guild.name} Dashboard**`,
      components: [_ButtonRow([CreateGoalButton(), CreateTaskButton()])],
    });

    goals.forEach(async (goal) => {
      await interaction.channel.send({
        content: `**Goal:** ${goal.title}`,
        embeds: [await this.generate(goal)],
        components: [
          _ButtonRow([EditGoalButton(goal.id), DeleteGoalButton(goal.id)]),
        ],
      });

      const thisGoalTasks = tasks.filter((task) => task.goalId === goal.id);

      thisGoalTasks.forEach(async (task) => {
        if (!task.userId) {
          interaction.channel.send({
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
          interaction.channel.send({
            content: `Task: ${task.title} assigned to <@${task.userId}>`,
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
      });
    });

    const tasksWithoutGoal = tasks.filter((task) => !task.goalId);

    tasksWithoutGoal.forEach(async (task) => {
      if (!task.userId) {
        interaction.channel.send({
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
        interaction.channel.send({
          embeds: [await this.createTaskEmbed(task)],
          components: [
            _ButtonRow([
              UnassignTaskButton(task.id),
              EditTaskButton(task.id),
              AddMoreInfoToTaskButton(task.id),
              CompleteTaskButtonButton(task.id),
              DeleteTaskButton(task.id),
            ]),
          ],
        });
      }
    });
  }
}
