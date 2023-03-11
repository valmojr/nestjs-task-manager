import { Goal } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Modal, Ctx, ModalContext } from 'necord';
import { CreateGoalHandler } from './CreateGoalHandler.service';
import { GoalInput } from 'src/goal/entity/Goal.entity';
import { EmbedBuilder } from '@discordjs/builders';

@Injectable()
export class CreateGoalModal extends CreateGoalHandler {
  @Modal('goalcreationmodal')
  public async onGoalCreationModal(@Ctx() [interaction]: ModalContext) {
    const newGoal: GoalInput = {
      title: interaction.fields.getTextInputValue('title'),
      description: interaction.fields.getTextInputValue('description'),
      status: 0,
      image: interaction.fields.getTextInputValue('image'),
      dueDate: null,
    };

    const goalInDatabase: Goal = await this.goalCreatorHandler(
      newGoal,
      interaction.user.username,
    );

    return interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(goalInDatabase.title)
          .setDescription(goalInDatabase.description)
          .setImage(goalInDatabase.image)
          .setFooter({ text: `Goal ID: ${goalInDatabase.id}` }),
      ],
    });
  }
}
