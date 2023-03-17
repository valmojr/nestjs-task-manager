import { Injectable } from '@nestjs/common';
import {
  ComponentParam,
  Context,
  StringSelect,
  UserSelect,
  UserSelectContext,
} from 'necord';

@Injectable()
export class CreateTaskReceiver {
  @UserSelect('ContextMenuAssignTaskToUser/:value')
  public async onUserSelect(
    @Context() [interaction]: UserSelectContext,
    @ComponentParam('value') value: string,
  ) {
    return await interaction.reply(`You selected ${value}`);
  }

  @StringSelect('ContextMenuAssignTaskToGoal/:value')
  public async onGoalSelect(
    @Context() [interaction]: UserSelectContext,
    @ComponentParam('value') value: string,
  ) {
    return await interaction.reply(`You selected ${value}`);
  }
}
