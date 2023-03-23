import { Injectable, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import CreateTaskModal from 'src/DiscordBot/Util/Modals/CreateTask.modal';

@Injectable()
export class CreateTaskCommandService {
  private logger = new Logger(CreateTaskCommandService.name);

  @SlashCommand({
    name: 'create-task',
    description: 'Create a task',
  })
  async createTaskModalCaller(@Context() [interaction]: SlashCommandContext) {
    this.logger.log('Create task command called');
    return interaction.showModal(CreateTaskModal());
  }
}
