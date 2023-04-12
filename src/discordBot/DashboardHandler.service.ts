import { Injectable } from '@nestjs/common';
import { Reminder } from '@prisma/client';
import { GuildService } from 'src/guild/guild.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { CronService } from './Cron.service';
import CreateChildTaskButton from './utils/Buttons/CreateChildTask.button';
import CreateMasterTask from './utils/Buttons/CreateMasterTask';
import DeleteTaskButton from './utils/Buttons/DeleteTask.button';
import _ButtonRow from './utils/Buttons/_ButtonRow';
import ChannelWiper from './utils/ChannelWiper';
import EmbedTask from './utils/Embeds/EmbedTask';
import EmbedTaskWithoutChilds from './utils/Embeds/EmbedTaskWithoutChilds';
import { Client } from 'discord.js';

@Injectable()
export class DashboardHandlerService {
  constructor(
    private readonly taskService: TaskService,
    private readonly guildService: GuildService,
    private readonly reminderService: ReminderService,
    private readonly userService: UserService,
  ) {}

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
            content: `**${guildOnDatabase.name} - Dashboard**`,
            components: [_ButtonRow([CreateMasterTask(guildOnDatabase.id)])],
          });

          guildMasterTasks.forEach(async (masterTask) => {
            const childTasks = await this.taskService.findByFatherTaskId(
              masterTask.id,
            );

            if (childTasks.length > 0) {
              await channel.send({
                embeds: [EmbedTask(masterTask, childTasks.length)],
                components: [
                  _ButtonRow([
                    CreateChildTaskButton(masterTask.id),
                    DeleteTaskButton(masterTask.id),
                  ]),
                ],
              });
            } else {
              await channel.send({
                embeds: [EmbedTaskWithoutChilds(masterTask)],
                components: [
                  _ButtonRow([
                    CreateChildTaskButton(masterTask.id),
                    DeleteTaskButton(masterTask.id),
                  ]),
                ],
              });
            }
          });
        }
      });
    });
  }
}
