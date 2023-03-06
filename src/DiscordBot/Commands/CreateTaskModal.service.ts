import { Injectable } from '@nestjs/common';
import { Modal, Ctx, ModalContext } from 'necord';

@Injectable()
export class CreateTaskModal {
  @Modal('create-task-modal')
  public onTaskCreationModal(@Ctx() [interaction]: ModalContext) {
    return interaction.reply({ content: 'Your task is' });
  }
}
