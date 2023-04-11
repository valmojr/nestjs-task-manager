import { Injectable, Logger } from '@nestjs/common';
import { Button, ButtonContext, ComponentParam, Ctx } from 'necord';
import { GuildService } from 'src/guild/guild.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';
import { ChannelType } from 'discord-api-types/v9';

@Injectable()
export class MessageComponentHandlersService {
  constructor(
    private readonly userService: UserService,
    private readonly guildService: GuildService,
    private readonly taskService: TaskService,
    private readonly reminderService: ReminderService,
  ) {}

  private readonly logger = new Logger(MessageComponentHandlersService.name);

  @Button('ConfirmDashboard/:guildId')
  async confirmDashboard(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('guildId') guildId: string,
  ) {
    const guildOnDatabase = await this.guildService.findByDiscordId(guildId);

    if (!guildOnDatabase) {
      this.logger.warn(
        `Guild not found while trying to create dashboard channel for guild ${guildId}`,
      );
      throw new Error('Guild not found');
    } else if (guildOnDatabase.dashboardChannelId) {
      const dashboardChannel = interaction.guild.channels.create({
        name: 'dashboard',
        type: ChannelType.GuildText,
      });

      const guild = await this.guildService.setDashboardChannel(
        guildId,
        (
          await dashboardChannel
        ).id,
      );

      return await interaction.reply({
        content: `Dashboard channel created: <#${guild.dashboardChannelId}>`,
        ephemeral: true,
      });
    }
  }

  @Button('DenyDashboard/:guildId')
  async denyDashboard(@Ctx() [interaction]: ButtonContext) {
    return await interaction.reply({
      content: 'Dashboard creation canceled',
      ephemeral: true,
    });
  }
}