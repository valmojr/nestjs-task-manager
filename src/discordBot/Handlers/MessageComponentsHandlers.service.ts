import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Button, ButtonContext, Ctx, ComponentParam } from 'necord';
import { GuildService } from 'src/guild/guild.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { ChannelType } from 'discord-api-types/v9';
import CreateMasterTaskModal from '../utils/Modal/CreateMasterTask.modal';
import CreateChildTaskModal from '../utils/Modal/CreateChildTask.modal';
import CustomizeBotModal from '../utils/Modal/CustomizeBot.modal';
import EmbedTask from '../utils/MessageGenerators/EmbedTask';
import { DashboardHandlerService } from './DashboardHandler.service';

@Injectable()
export class MessageComponentHandlersService {
  constructor(
    private readonly userService: UserService,
    private readonly guildService: GuildService,
    private readonly taskService: TaskService,
    private readonly reminderService: ReminderService,
    private readonly dashboardHandlerService: DashboardHandlerService,
  ) {}

  private readonly logger = new Logger(MessageComponentHandlersService.name);

  @Button('ConfirmDashboardButton/:guildId')
  async confirmDashboard(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('guildId') guildId: string,
  ) {
    const guildOnDatabase = await this.guildService.findByDiscordId(guildId);

    if (!guildOnDatabase) {
      this.logger.error(
        `Guild not found while trying to create dashboard channel for guild ${guildId}`,
      );
      throw new Error('Guild not found');
    } else if (!guildOnDatabase.dashboardChannelId) {
      const dashboardChannel = interaction.guild.channels.create({
        name: 'dashboard',
        type: ChannelType.GuildText,
      });

      interaction.showModal(CustomizeBotModal(interaction.guild.id));

      const guild = await this.guildService.setDashboardChannel(
        guildOnDatabase.id,
        (
          await dashboardChannel
        ).id,
      );

      return await interaction.reply({
        content: `Dashboard channel created: <#${guild.dashboardChannelId}>`,
        ephemeral: true,
      });
    } else {
      return await interaction.reply({
        content: `Dashboard channel already exists: <#${guildOnDatabase.dashboardChannelId}>`,
        ephemeral: true,
      });
    }
  }

  @Button('DenyDashboardButton/:guildId')
  async denyDashboard(@Ctx() [interaction]: ButtonContext) {
    return await interaction.reply({
      content: 'Dashboard creation canceled',
      ephemeral: true,
    });
  }

  @Button('CreateMasterTaskButton/:guildId')
  async createMasterTaskOnGuild(@Ctx() [interaction]: ButtonContext) {
    return await interaction.showModal(
      CreateMasterTaskModal(interaction.guild.id),
    );
  }

  @Button('CreateChildTaskButton/:taskId')
  async createChildTaskOnGuild(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') fatherTaskId: string,
  ) {
    return await interaction.showModal(CreateChildTaskModal(fatherTaskId));
  }

  @Button('CheckChildTasksButton/:taskId')
  async checkChildTasks(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.findById(taskId);
    const childTasks = await this.taskService.findByFatherTaskId(taskId);

    if (!task) {
      this.logger.error(
        `Task not found while trying to check child tasks for task ${taskId}`,
      );

      throw new BadRequestException('Task not found');
    }

    for (const childTask of childTasks) {
      await interaction.reply({
        content: `Task ${childTask.title} - ${childTask.status}%`,
        ephemeral: true,
      });
    }
  }

  @Button('CompleteTaskButton/:taskId')
  async completeTask(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.findById(taskId);
    const childTasks = await this.taskService.findByFatherTaskId(taskId);

    if (childTasks.length > 0) {
      return await interaction.reply({
        content: `Task ${task.title} has subtasks, complete them first`,
        ephemeral: true,
      });
    }

    if (!task) {
      this.logger.error(
        `Task not found while trying to complete task ${taskId}`,
      );
      throw new Error('Task not found');
    }

    await this.taskService.update(taskId, {
      ...task,
      status: 100,
    });

    interaction.message.edit({
      embeds: [EmbedTask(task, childTasks.length, true)],
    });

    return await interaction.reply({
      content: `Task ${task.title} completed`,
      ephemeral: true,
    });
  }

  @Button('DeleteTaskButton/:taskId')
  async deleteTask(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.findById(taskId);

    if (!task) {
      this.logger.error(`Task not found while trying to delete task ${taskId}`);
      throw new Error('Task not found');
    }

    await this.taskService.remove(taskId);

    interaction.message.delete();

    return await interaction.reply({
      content: `Task ${task.title} deleted`,
      ephemeral: true,
    });
  }
}
