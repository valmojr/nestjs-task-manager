import { Injectable, Logger } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { EmbedTaskService } from 'src/DiscordBot/Commands/Task/util/embedTask.service';
import { AssignTaskToGoalDTO } from './AssignTaskToGoal.dto';
import { TaskService } from 'src/task/task.service';
import { GoalService } from 'src/Goal/goal.service';
import { EmbedGoalService } from '../../Goal/util/EmbedGoal.service';

@Injectable()
export class AssignTaskToGoalCommand extends EmbedGoalService {
  constructor(
    private readonly taskService: TaskService,
    private readonly goalService: GoalService,
  ) {
    super();
  }

  private logger = new Logger(AssignTaskToGoalCommand.name);

  @SlashCommand({
    name: 'assign-task-to-goal',
    description: 'Assign a task to a goal',
  })
  public async onSlashTaskAssign(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: AssignTaskToGoalDTO,
  ) {
    const currentTask = await this.taskService.findById(params.taskId);

    if (!currentTask) {
      this.logger.log(
        `${interaction.user.username} tried to assign a task to a goal, but the task was not found. Task id: ${params.taskId}`,
      );
      return interaction.reply({
        content: 'Task not found',
      });
    }

    const targetGoal = await this.goalService.findById(params.goalId);

    if (!targetGoal) {
      this.logger.log(
        `${interaction.user.username} tried to assign a task to a goal, but the goal was not found. Goal id: ${params.goalId}`,
      );
      return 'Goal not found';
    }

    const assignedTask = await this.taskService.updateById(params.taskId, {
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      image: currentTask.image,
      status: 'pending',
      dueDate: currentTask.dueDate,
      goalId: targetGoal.id,
      userId: currentTask.userId,
    });

    this.logger.log(
      `Task ${currentTask.title} add into ${assignedTask.title} goal`,
    );

    return await interaction.reply({
      content: `${currentTask.title} assigned to ${targetGoal.title}`,
      embeds: [EmbedTaskService.createTaskEmbed(assignedTask)],
      ephemeral: true,
    });
  }
}
