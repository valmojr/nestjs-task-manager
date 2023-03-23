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

    new CronService('0 0 14-22/2 * * *', async () => {
      this.logger.log(`Updating Dashboard at ${new Date().toISOString()}`);

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

    return interaction.reply({
      content: `Dashboard creation cancelled.`,
      ephemeral: true,
    });
  }
}
