import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import CreateGoalModal from 'src/DiscordBot/Util/Modals/CreateGoal.modal';

@Injectable()
export class CreateGoalCommand {
  @SlashCommand({
    name: 'create-goal',
    description: 'Create a goal by popup',
  })
  public async createGoal(@Context() [interaction]: SlashCommandContext) {
    return interaction.showModal(CreateGoalModal());
  }
}
