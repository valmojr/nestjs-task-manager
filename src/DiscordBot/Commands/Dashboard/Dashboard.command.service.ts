import { Injectable, Logger } from '@nestjs/common';
import {
  Button,
  ButtonContext,
  Context,
  SlashCommand,
  SlashCommandContext,
} from 'necord';
import { CronService } from 'src/DiscordBot/Cron.service';
import DashboardConfirmButton from 'src/DiscordBot/Util/Buttons/DashboardConfirm.button';
import DashboardDenyButton from 'src/DiscordBot/Util/Buttons/DashboardDeny.button';
import _ButtonRow from 'src/DiscordBot/Util/Buttons/_ButtonRow';
import ChannelWiper from 'src/DiscordBot/Util/ChannelWiper';
import { DashboardSenderService } from './DashboardSender.service';

@Injectable()
export class DashboardCommandService {
  constructor(
    private readonly dashboardSenderService: DashboardSenderService,
  ) {}

  private logger = new Logger(DashboardCommandService.name);

  @SlashCommand({
    name: 'dashboard',
    description: 'Create a dashboard for your goals and tasks in a channel',
  })
  async dashboardCreator(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(
      `Dashboard command called by ${interaction.user.username} in ${interaction.guild.name} - ${interaction.channel.name}`,
    );

    return interaction.reply({
      content: `Creating a Dashboard in this channel will erase all messages in this channel. Are you sure you want to continue?`,
      components: [
        _ButtonRow([DashboardConfirmButton(), DashboardDenyButton()]),
      ],
      ephemeral: true,
    });
  }

  @Button('dashboardConfirmCreation')
  async dashboardConfirmCreation(@Context() [interaction]: ButtonContext) {
    this.logger.log(
      `Dashboard command confirmed by ${interaction.user.username} in ${interaction.guild.name} - ${interaction.channel.name}`,
    );

    interaction.channel.setName('dashboard');

    // Monday - Friday
    new CronService('0 0 16-22 * * 1-5', async () => {
      this.logger.log(`Updating Dashboard at ${new Date()}`);

      await this.dashboardSenderService.overview([interaction]);
    });

    // Saturday
    new CronService('0 0 11-22 * * 6', async () => {
      this.logger.log(`Updating Dashboard at ${new Date()}`);

      await this.dashboardSenderService.overview([interaction]);
    });

    // Sunday
    new CronService('0 0 11-22 * * 0', async () => {
      this.logger.log(`Updating Dashboard at ${new Date()}`);

      await this.dashboardSenderService.overview([interaction]);
    });

    return interaction.reply({
      content: `Dashboard created in this channel.`,
      ephemeral: true,
    });
  }

  @Button('dashboardDenyCreation')
  async dashboardDenyCreation(@Context() [interaction]: ButtonContext) {
    this.logger.log(
      `Dashboard command denied by ${interaction.user.username} in ${interaction.guild.name} - ${interaction.channel.name}`,
    );

    return interaction.update({});
  }

  @SlashCommand({
    name: 'dashboard-once',
    description:
      'Create a dashboard for your goals and tasks in a channel once',
  })
  async dashboardOnce(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(
      `Dashboard command called by ${interaction.user.username} in ${interaction.guild.name} - ${interaction.channel.name}`,
    );

    await this.dashboardSenderService.overview([interaction]);

    return interaction.reply({
      content: `Dashboard created in this channel.`,
      ephemeral: true,
    });
  }
}
