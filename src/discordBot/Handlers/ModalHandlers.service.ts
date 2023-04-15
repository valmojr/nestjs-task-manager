import { Injectable, Logger } from '@nestjs/common';
import { Reminder, Task } from '@prisma/client';
import { ComponentParam, Ctx, Modal, ModalContext, ModalParam } from 'necord';
import { GuildService } from 'src/guild/guild.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import EmbedTask from '../utils/MessageGenerators/EmbedTask';
import _ButtonRow from '../utils/Buttons/_ButtonRow';
import CompleteTaskButton from '../utils/Buttons/CompleteTask.button';
import AssignTaskToMeButton from '../utils/Buttons/AssignTaskToMe.button';
import DeleteTaskButton from '../utils/Buttons/DeleteTask.button';
import IdGenerator from 'src/utils/IdGenerator';
import CreateChildTaskButton from '../utils/Buttons/CreateChildTask.button';

@Injectable()
export class ModalHandlersService {
  constructor(
    private readonly userService: UserService,
    private readonly guildService: GuildService,
    private readonly taskService: TaskService,
    private readonly reminderService: ReminderService,
  ) {}

  private logger = new Logger(ModalHandlersService.name);

  @Modal(`CustomizeBotModal/:guildId`)
  async customizeBotModal(@Ctx() [interaction]: ModalContext) {
    const username = interaction.fields.getTextInputValue(
      'discordBotDisplayName',
    );

    if (username) {
      this.logger.log(
        `Setting bot username to ${username} in guild ${interaction.guild.id}`,
      );

      interaction.guild.members.me.setNickname(username);
    }

    interaction.reply({
      content: 'Bot customization successful!',
      ephemeral: true,
    });
  }

  @Modal(`SetDashboardFrequencyModal/:guildId`)
  async setDashboardFrequencyModal(
    @Ctx() [interaction]: ModalContext,
    @ComponentParam('guildId') guildId: string,
  ) {
    this.logger.log(
      `Setting dashboard update frequency in guild ${interaction.guild.id}`,
    );

    const guild = await this.guildService.findByDiscordId(interaction.guild.id);

    let seconds = interaction.fields.getTextInputValue('eachSeconds');
    let minuntes = interaction.fields.getTextInputValue('eachMinutes');
    let hours = interaction.fields.getTextInputValue('eachHours');
    let daysOfMonth = interaction.fields.getTextInputValue('eachDaysOfMonth');
    let months = interaction.fields.getTextInputValue('eachMonths');

    if (!seconds) {
      seconds = '*';
    }
    if (!minuntes) {
      minuntes = '*';
    }
    if (!hours) {
      hours = '*';
    }
    if (!daysOfMonth) {
      daysOfMonth = '*';
    }
    if (!months) {
      months = '*';
    }

    const frequency = `${seconds} ${minuntes} ${hours} ${daysOfMonth} ${months} *`;

    const reminder: Reminder = await this.reminderService.create({
      id: IdGenerator(),
      title: `Dashboard update for guild ${guildId}`,
      recurring: frequency,
      guildId: guild.id,
    });

    return await interaction.reply({
      content: `Dashboard update frequency set to ${reminder.recurring} in guild ${guildId}`,
      ephemeral: true,
    });
  }

  @Modal(`CreateMasterTaskModal/:guildId`)
  async createMasterTaskModal(@Ctx() [interaction]: ModalContext) {
    const guild = await this.guildService.findByDiscordId(interaction.guild.id);

    const title = interaction.fields.getTextInputValue('taskTitle');
    let description = interaction.fields.getTextInputValue('taskDescription');
    let image = interaction.fields.getTextInputValue('taskImage');

    if (title.length === 0) {
      throw new Error('Task title cannot be empty');
    }
    if (description.length === 0) {
      description = 'No description provided';
    }
    if (image.length === 0) {
      image = null;
    }

    const task: Task = await this.taskService.create({
      id: IdGenerator(),
      title,
      description,
      image,
      level: 0,
      status: 0,
      fatherTaskId: null,
      userIDs: [],
      guildId: guild.id,
    });

    return await interaction.reply({
      content: `Task **${task.title}** created successfully!`,
      embeds: [EmbedTask(task, 0, false)],
      components: [
        _ButtonRow([
          CompleteTaskButton(task.id),
          CreateChildTaskButton(task.id),
          AssignTaskToMeButton(task.id),
          DeleteTaskButton(guild.id),
        ]),
      ],
    });
  }

  @Modal(`CreateChildTaskModal/:fatherTaskId`)
  async createChildTaskModal(
    @Ctx() [interaction]: ModalContext,
    @ModalParam('fatherTaskId') fatherTaskId: string,
  ) {
    const guild = await this.guildService.findByDiscordId(interaction.guild.id);

    const title = interaction.fields.getTextInputValue('taskTitle');
    const description = interaction.fields.getTextInputValue('taskDescription');
    const image = interaction.fields.getTextInputValue('taskImage');

    const fatherTask = await this.taskService.findById(fatherTaskId);

    if (title.length < 3) {
      return await interaction.reply({
        content: 'The title must be at least 3 characters long.',
        ephemeral: true,
      });
    }

    if (image && !image.startsWith('http')) {
      this.logger.error(
        `${interaction.user.username} tried to create a task with an invalid image url in guild ${guild.name}`,
      );
      return await interaction.reply({
        content: 'The image must be a valid url.',
        ephemeral: true,
      });
    }

    console.log(fatherTask);

    const task: Task = await this.taskService.create({
      id: IdGenerator(),
      title,
      description,
      image,
      level: fatherTask.level + 1,
      status: 0,
      fatherTaskId: fatherTask.id,
      userIDs: [],
      guildId: guild.id,
    });

    return await interaction.reply({
      embeds: [EmbedTask(task, 0, true)],
    });
  }
}
