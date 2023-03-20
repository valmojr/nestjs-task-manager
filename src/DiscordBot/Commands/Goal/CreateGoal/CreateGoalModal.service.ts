import { Goal } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Modal, Ctx, ModalContext } from 'necord';
import { CreateGoalHandler } from './CreateGoalHandler.service';
import { GoalInput } from 'src/goal/entity/Goal.entity';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';

@Injectable()
export class CreateGoalModal {
  constructor(
    private readonly createGoalHandler: CreateGoalHandler,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {}
  @Modal('goalcreationmodal')
  public async onGoalCreationModal(@Ctx() [interaction]: ModalContext) {
    const newGoal: GoalInput = {
      title: interaction.fields.getTextInputValue('title'),
      description: interaction.fields.getTextInputValue('description'),
      status: 0,
      image: interaction.fields.getTextInputValue('image'),
      dueDate: null,
    };

    const goalInDatabase: Goal =
      await this.createGoalHandler.goalCreatorHandler(
        newGoal,
        interaction.user.username,
      );

    return interaction.reply({
      embeds: [await this.embedGeneratorService.generate(goalInDatabase)],
    });
  }
}
