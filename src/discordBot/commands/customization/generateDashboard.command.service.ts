import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GuildService } from 'src/guild/guild.service';
import { ReminderService } from 'src/reminder/reminder.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GenerateDashboardCommandService {
  constructor(
    private readonly reminderService: ReminderService,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly guildService: GuildService,
  ) {}

  private logger = new Logger(GenerateDashboardCommandService.name);

  @SlashCommand({
    name: 'generate-dashboard',
    description: 'Generate a dashboard for your server',
  })
  async generateDashboard(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Generating dashboard for ${interaction.guild.name}`);

    let guild = await this.guildService.findByDiscordId(
      interaction.guild.id,
    )[0];

    if (!guild) {
      guild = await this.guildService.create({
        id: randomUUID(),
        discordId: interaction.guild.id,
        name: interaction.guild.name,
        avatar: interaction.guild.iconURL(),
        dashboardChannelId: null,
        userIDs: [],
      });
    }

    const guildMembers = await interaction.guild.members.fetch();

    guildMembers.forEach(
      async (member) =>
        await this.guildService.checkOrAddUserToGuild(member.id, guild.id),
    );

    await this.guildService.updateById(guild.id, {
      ...guild,
      dashboardChannelId: interaction.channel.id,
    });

    await interaction.reply('Dashboard generated!');
  }
}
