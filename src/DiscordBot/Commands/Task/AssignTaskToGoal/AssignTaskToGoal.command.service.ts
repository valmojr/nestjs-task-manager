import { Injectable, Logger } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { EmbedTaskService } from 'src/DiscordBot/Commands/Task/util/embedTask.service';
import { AssignTaskToGoalDTO } from './AssignTaskToGoal.dto';
import { TaskService } from 'src/task/task.service';
import { GoalService } from 'src/Goal/goal.service';

@Injectable()
export class AssignTaskToGoalCommand {
  constructor(
    private readonly taskService: TaskService,
    private readonly goalService: GoalService,
  ) {}

  private logger = new Logger(AssignTaskToGoalCommand.name);

  @SlashCommand({
    name: 'assign-task-to-goal',
    description: 'Assign a task to a goal',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskAssign(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: AssignTaskToGoalDTO,
  ) {
    //const currentTask = await this.taskService.findById(params.taskId);
    //
    //if (!currentTask) {
    //  return 'Task not found';
    //}
    //const targetGoal = await this.goalService.findById(params.goalId);
    //
    //if (!targetGoal) {
    //  return 'Goal not found';
    //}
    //
    //const assignTask = await this.taskService.updateById(params.taskId, {
    //  ...currentTask,
    //  goalId: targetGoal.id,
    //  status: 'not_assigned',
    //});
    //
    //this.logger.log(
    //  `Task ${currentTask.title} assigned to ${targetGoal.title}`,
    //);
    //
    //return await interaction.reply({
    //  content: `${currentTask.title} assigned to ${targetGoal.title}`,
    //  embeds: [EmbedTaskService.createTaskEmbed(assignTask)],
    //});
  }
}
