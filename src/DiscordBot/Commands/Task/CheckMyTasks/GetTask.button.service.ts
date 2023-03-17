import { Injectable } from '@nestjs/common';
import { Button, Context, ButtonContext } from 'necord';

@Injectable()
export class AppComponents {
  @Button('getTask')
  onGetTask(@Context() [interaction]: ButtonContext) {
    return interaction.reply({
      content: `You pressed the button!`,
      ephemeral: true,
    });
  }
}
