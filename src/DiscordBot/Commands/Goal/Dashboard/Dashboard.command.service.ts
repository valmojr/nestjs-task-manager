import { Injectable, Logger } from '@nestjs/common';
import { CronExpression } from '@nestjs/schedule';
import { ActionRowBuilder, ButtonBuilder } from 'discord.js';
import {
  Button,
  ButtonContext,
  ComponentParam,
  Context,
  Ctx,
  SlashCommand,
  SlashCommandContext,
} from 'necord';
import { CronService } from 'src/DiscordBot/Cron.service';
import ChannelWiper from 'src/DiscordBot/Util/ChannelWiper';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { DashboardSenderService } from './DashboardSender.service';

@Injectable()
export class DashboardCommandService {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
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

    const goals = await this.goalService.findAll();
    const tasks = await this.taskService.findAll();

    interaction.channel.setName('dashboard');

    new CronService(CronExpression.EVERY_5_MINUTES, async () => {
      this.logger.log(`Updating Dashboard at ${new Date().toISOString()}`);
      await ChannelWiper([interaction]);

      await this.dashboardSenderService.overview([interaction], goals, tasks);
    });

    return interaction.reply({
      content: `Dashboard configured for this channel`,
      ephemeral: true,
    });
  }
}
