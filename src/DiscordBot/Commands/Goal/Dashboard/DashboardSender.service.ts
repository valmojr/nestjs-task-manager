import { Injectable } from '@nestjs/common';
import { Goal, Task } from '@prisma/client';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import AssignTaskToMeButton from 'src/DiscordBot/Util/Buttons/AssignTaskToMe.button';
import CompleteTaskButtonButton from 'src/DiscordBot/Util/Buttons/CompleteTaskButton.button';
import DeleteTaskButton from 'src/DiscordBot/Util/Buttons/DeleteTaskButton';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';

@Injectable()
export class DashboardSenderService extends EmbedGeneratorService {
  public async overview([interaction]: any, goals: Goal[], tasks: Task[]) {
    goals.forEach(async (goal) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const thisGoalTasks = tasks.filter((task) => task.goalId === goal.id);

      await interaction.channel.send({
        content: `**${goal.title}**`,
        embeds: [await this.generate(goal)],
      });

      if (thisGoalTasks.length > 0) {
        thisGoalTasks.forEach(async (task) => {
          if (!task.userId) {
            interaction.channel.send({
              embeds: [await this.createTaskEmbed(task)],
              components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents([
                  AssignTaskToMeButton(task.id),
                  CompleteTaskButtonButton(task.id),
                  DeleteTaskButton(task.id),
                ]),
              ],
            });
          } else {
            interaction.channel.send({
              embeds: [await this.createTaskEmbed(task)],
              components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents([
                  CompleteTaskButtonButton(task.id),
                  DeleteTaskButton(task.id),
                ]),
              ],
            });
          }
        });
      }
    });

    const tasksWithoutGoals = tasks.filter((task) => !task.goalId);

    await new Promise(() =>
      setTimeout(() => {
        if (tasksWithoutGoals.length > 0) {
          interaction.channel.send({
            content: `**Tasks without Goals:**`,
          });
          tasksWithoutGoals.forEach(async (task) => {
            if (!task.userId) {
              interaction.channel.send({
                embeds: [await this.createTaskEmbed(task)],
                components: [
                  new ActionRowBuilder<ButtonBuilder>().addComponents([
                    AssignTaskToMeButton(task.id),
                    CompleteTaskButtonButton(task.id),
                    DeleteTaskButton(task.id),
                  ]),
                ],
              });
            } else {
              interaction.channel.send({
                embeds: [await this.createTaskEmbed(task)],
                components: [
                  new ActionRowBuilder<ButtonBuilder>().addComponents([
                    CompleteTaskButtonButton(task.id),
                    DeleteTaskButton(task.id),
                  ]),
                ],
              });
            }
          });
        }
      }, 1000),
    );
  }
}
