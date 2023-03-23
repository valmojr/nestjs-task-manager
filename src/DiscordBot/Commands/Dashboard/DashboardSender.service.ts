import { Injectable } from '@nestjs/common';
import CreateGoalButton from 'src/DiscordBot/Util/Buttons/CreateGoal.button';
import CreateTaskButton from 'src/DiscordBot/Util/Buttons/CreateTask.button';
import DeleteGoalButton from 'src/DiscordBot/Util/Buttons/DeleteGoalButton';
import EditGoalButton from 'src/DiscordBot/Util/Buttons/EditGoal.button';
import _ButtonRow from 'src/DiscordBot/Util/Buttons/_ButtonRow';
import ChannelWiper from 'src/DiscordBot/Util/ChannelWiper';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { MessageGeneratorService } from 'src/DiscordBot/Util/Messanger/MessageGenerator.service';
import { StatusColorPicker } from 'src/DiscordBot/Util/StatusColorPicker.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class DashboardSenderService extends EmbedGeneratorService {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
    private readonly messageGeneratorService: MessageGeneratorService,
  ) {
    super();
  }

  public async overview([interaction]: any) {
    await ChannelWiper([interaction]);

    const goals = await this.goalService.findAll();
    const tasks = await this.taskService.findAll();

    await interaction.channel.setName(`dashboard`);

    await interaction.channel.send({
      content: `**${interaction.guild.name} Dashboard**\n`,
      components: [_ButtonRow([CreateGoalButton(), CreateTaskButton()])],
    });

    goals.forEach(async (goal) => {
      await interaction.channel.send({
        content: `**Goal:** ${goal.title}\n\n${StatusColorPicker.getGoalEmoji(
          goal.status,
        )}`,
        embeds: [await this.generate(goal)],
        components: [
          _ButtonRow([EditGoalButton(goal.id), DeleteGoalButton(goal.id)]),
        ],
      });

      const thisGoalTasks = tasks.filter((task) => task.goalId === goal.id);

      thisGoalTasks.forEach(async (task) => {
        this.messageGeneratorService.generateTaskMessage([interaction], task);
      });
    });

    const tasksWithoutGoal = tasks.filter((task) => !task.goalId);

    tasksWithoutGoal.forEach(async (task) => {
      this.messageGeneratorService.generateTaskMessage([interaction], task);
    });
  }
}
