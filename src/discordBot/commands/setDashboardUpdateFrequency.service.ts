import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext } from 'necord';
import SetDashboardFrequencyModal from '../utils/Modal/SetDashboardFrequency.modal';

@Injectable()
export class SetDashboardUpdateFrequencyService {
  @SlashCommand({
    name: 'set-dashboard-update-frequency',
    description: 'Set the update frequency of the dashboard',
  })
  async setDashboardUpdateFrequency(
    @Context() [interaction]: SlashCommandContext,
  ) {
    return interaction.showModal(
      SetDashboardFrequencyModal(interaction.guild.id),
    );
  }
}
