import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { AutocompleteInterceptor } from 'necord';

@Injectable()
export class StatusAutoCompleteInterceptor extends AutocompleteInterceptor {
  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);

    let choices: string[];

    if (focused.value == 'status') {
      choices = ['not_assigned', 'pending', 'done', 'stuck', 'cancelled'];
    }

    return interaction.respond(
      choices
        .filter((choice) => choice.startsWith(focused.value))
        .map((choice) => ({ name: choice, value: choice })),
    );
  }
}
