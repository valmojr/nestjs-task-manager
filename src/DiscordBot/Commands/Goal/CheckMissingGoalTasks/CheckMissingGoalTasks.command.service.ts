import { Injectable } from '@nestjs/common';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { CheckMissingGoalTasksDTO } from './CheckMissingGoalTasksOptions.dto';

@Injectable()
export class CheckMissingGoalTasksService {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {}
  //um comando pra ver quais as tarefas que faltam
  @SlashCommand({
    name: 'check-missing-goal-tasks',
    description: 'Check for pending goal tasks',
  })
  async checkMissingGoalTasks(
    @Context() [interaction]: SlashCommandContext,
    @Options() { goalId }: CheckMissingGoalTasksDTO,
  ) {
    const goal = await this.goalService.findById(goalId);
    const goalTasks = await this.taskService.findByGoalId(goalId);

    const missingTasks = [];
    goalTasks.map((task) => {
      if (task.status !== 'completed') {
        missingTasks.push(task);
      }
    });

    const embedMissingTasks = await Promise.all(
      missingTasks.map((task) =>
        this.embedGeneratorService.createTaskEmbed(task),
      ),
    );

    return interaction.reply({
      content: `Missing tasks for ${goal.title}: ${missingTasks.length}`,
      embeds: embedMissingTasks,
    });
  }
}
