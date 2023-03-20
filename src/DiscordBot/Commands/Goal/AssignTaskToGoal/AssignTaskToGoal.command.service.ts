import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { AssignTaskToGoalDTO } from './AssignTaskToGoalDTO';

@Injectable()
export class AssignTaskToGoalCommand {
  constructor(
    private readonly goalService: GoalService,
    private readonly taskService: TaskService,
  ) {}

  private logger = new Logger(AssignTaskToGoalCommand.name);

  @SlashCommand({
    name: 'assign-task-to-goal',
    description: 'Assign a task to a goal',
  })
  public async onTaskAssignToGoal(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: AssignTaskToGoalDTO,
  ) {
    const currentTask = await this.taskService.findById(params.taskId);

    if (!currentTask) {
      return 'Task not found';
    }
    const targetGoal = await this.goalService.findById(params.goalId);

    if (!targetGoal) {
      return 'Goal not found';
    }

    const assignTask = await this.taskService.updateById(params.taskId, {
      ...currentTask,
      goalId: targetGoal.id,
      status: 'not_assigned',
    });

    this.logger.log(
      `Task ${currentTask.title} assigned to ${targetGoal.title}`,
    );

    return await interaction.reply({
      content: `${currentTask.title} assigned to ${targetGoal.title}`,
      embeds: [EmbedGeneratorService.createTaskEmbed(assignTask)],
    });
  }
}
