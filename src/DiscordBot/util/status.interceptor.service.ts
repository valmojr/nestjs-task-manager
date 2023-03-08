import { Injectable, UseInterceptors } from '@nestjs/common';
import { AutocompleteInteraction, CommandInteraction } from 'discord.js';
import { AutocompleteInterceptor, Ctx, Opts, SlashCommand } from 'necord';

@Injectable()
export class StatusAutoCompleteInterceptor extends AutocompleteInterceptor {
  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);
    let choices: string[];

    if (focused.name === 'anime') {
      choices = ['not_assigned', 'pending', 'done', 'completed', 'on_hold'];
    }

    return interaction.respond(
      choices
        .filter((choice) => choice.startsWith(focused.value.toString()))
        .map((choice) => ({ name: choice, value: choice })),
    );
  }
}
