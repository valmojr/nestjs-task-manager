import { Injectable, Logger } from '@nestjs/common';
import { Reminder } from '@prisma/client';
import { randomUUID } from 'crypto';
import { ComponentParam, Ctx, Modal, ModalContext } from 'necord';
import { GuildService } from 'src/guild/guild.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';

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
      id: randomUUID(),
      title: `Dashboard update for guild ${guildId}`,
      recurring: frequency,
      guildId: guild.id,
    });

    return await interaction.reply({
      content: `Dashboard update frequency set to ${reminder.recurring} in guild ${guildId}`,
      ephemeral: true,
    });
  }
}
