import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class CreateGoalCommand {
  constructor(private readonly goalService: GoalService) {}

  @SlashCommand({
    name: 'create-goal',
    description: 'Create a goal',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  async createGoal(@Context() [interaction]: SlashCommandContext) {
    return await interaction.reply({
      content: 'Goal created',
    });
  }
}
