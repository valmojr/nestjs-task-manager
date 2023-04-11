import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import DashboardConfirmButton from 'src/discordBot/utils/Buttons/DashboardConfirm.button';
import DashboardDenyButton from 'src/discordBot/utils/Buttons/DashboardDeny.button';
import _ButtonRow from 'src/discordBot/utils/Buttons/_ButtonRow';

@Injectable()
export class GenerateDashboardCommandService {
  @SlashCommand({
    name: 'generate-dashboard',
    description: 'Generate a dashboard for your server',
  })
  async generateDashboard(@Context() [interaction]: SlashCommandContext) {
    return interaction.reply({
      content:
        'This command will generate a new channel and use it as dashboard for your server. Are you sure you want to continue?',
      components: [
        _ButtonRow([
          DashboardConfirmButton(interaction.guild.id),
          DashboardDenyButton(interaction.guild.id),
        ]),
      ],
      ephemeral: true,
    });
  }
}
