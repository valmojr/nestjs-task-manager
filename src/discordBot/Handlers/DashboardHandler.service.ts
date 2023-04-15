import { Injectable, Logger } from '@nestjs/common';
import { Reminder, Task } from '@prisma/client';
import { GuildService } from 'src/guild/guild.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { CronService } from '../Cron.service';
import CreateChildTaskButton from '../utils/Buttons/CreateChildTask.button';
import CreateMasterTask from '../utils/Buttons/CreateMasterTask';
import DeleteTaskButton from '../utils/Buttons/DeleteTask.button';
import _ButtonRow from '../utils/Buttons/_ButtonRow';
import ChannelWiper from '../utils/ChannelWiper';
import EmbedTask from '../utils/MessageGenerators/EmbedTask';
import { Client } from 'discord.js';
import AssignTaskToMeButton from '../utils/Buttons/AssignTaskToMe.button';
import CompleteTaskButton from '../utils/Buttons/CompleteTask.button';
import CheckChildTasksButton from '../utils/Buttons/CheckChildTasks.button';

@Injectable()
export class DashboardHandlerService {
  constructor(
    private readonly taskService: TaskService,
    private readonly guildService: GuildService,
    private readonly reminderService: ReminderService,
    private readonly userService: UserService,
  ) {}

  private logger = new Logger(DashboardHandlerService.name);

  async run(client: Client<true>) {
    const reminders = await this.reminderService.findAll();

    reminders.forEach(async (reminder: Reminder) => {
      new CronService(reminder.recurring, async () => {
        const guildOnDatabase = await this.guildService.findById(
          reminder.guildId,
        );

        const guildClient = client.guilds.cache.get(guildOnDatabase.discordId);

        const dashboardChannel = guildClient.channels.cache.get(
          guildOnDatabase.dashboardChannelId,
        );

        if (dashboardChannel) {
          const channel: any = await dashboardChannel.fetch();
          const guildMasterTasks = await this.taskService.getGuildMasterTasks(
            guildOnDatabase.id,
          );
          ChannelWiper(channel);

          await channel.send({
            content: `**${guildOnDatabase.name.toUpperCase()} - DASHBOARD**`,
            components: [_ButtonRow([CreateMasterTask(guildOnDatabase.id)])],
          });

          for (const masterTask of guildMasterTasks) {
            await channel.send(await this.generateTaskMessage(masterTask));
          }
        } else {
          this.logger.error(
            `Dashboard channel not found for guild ${guildOnDatabase.name} (${guildOnDatabase.id})`,
          );

          throw new Error(
            `Dashboard channel not found for guild ${guildOnDatabase.name} (${guildOnDatabase.id})`,
          );
        }
      });
    });
  }

  async generateTaskMessage(task: Task) {
    const childTasks = await this.taskService.findByFatherTaskId(task.id);

    const needTitle = task.fatherTaskId ? false : true;

    const taskMessage = {
      content: !task.fatherTaskId ? `**${task.title.toUpperCase()}**` : '',
      embeds: [EmbedTask(task, childTasks.length, needTitle)],
      components: [],
    };

    if (!!childTasks.length) {
      taskMessage.components.push(
        _ButtonRow([
          CreateChildTaskButton(task.id),
          CheckChildTasksButton(task.id),
          DeleteTaskButton(task.id),
        ]),
      );
    } else {
      taskMessage.components.push(
        _ButtonRow([
          CompleteTaskButton(task.id),
          CreateChildTaskButton(task.id),
          AssignTaskToMeButton(task.id),
          DeleteTaskButton(task.id),
        ]),
      );
    }

    return taskMessage;
  }
}
