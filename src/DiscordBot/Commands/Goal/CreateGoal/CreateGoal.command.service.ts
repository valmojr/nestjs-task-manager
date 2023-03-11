import { Injectable } from '@nestjs/common';
import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';

@Injectable()
export class CreateGoalCommand {
  constructor(private readonly goalService: GoalService) {}

  @SlashCommand({
    name: 'create-goal',
    description: 'Create a goal by popup',
  })
  public async createGoal(@Context() [interaction]: SlashCommandContext) {
    return interaction.showModal(
      new ModalBuilder()
        .setTitle('Create Goal')
        .setCustomId('goalcreationmodal')
        .setComponents([
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('title')
              .setLabel('Title')
              .setPlaceholder('Title')
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('description')
              .setLabel('Description')
              .setPlaceholder('Description')
              .setRequired(true)
              .setStyle(TextInputStyle.Paragraph),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('image')
              .setLabel('Image URL')
              .setPlaceholder('Image URL')
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ]),
        ]),
    );
  }
}
