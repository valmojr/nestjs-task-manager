import { Injectable, Logger } from '@nestjs/common';
import {
  Button,
  Ctx,
  ButtonContext,
  ComponentParam,
  Context,
  StringSelect,
  StringSelectContext,
  UserSelect,
  UserSelectContext,
} from 'necord';
import { GoalService } from 'src/goal/goal.service';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';

@Injectable()
export class MessageComponentHandlersService {
  constructor(
    private readonly taskService: TaskService,
    private readonly goalService: GoalService,
    private readonly userService: UserService,
  ) {}

  private logger = new Logger(MessageComponentHandlersService.name);

  @Button('AssignTaskToMe/:taskId')
  async assignTaskToMe(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    await this.userService.findOrCreateUser({
      id: interaction.user.id,
      name: interaction.user.username,
      avatar: interaction.user.avatar,
    });

    const task = await this.taskService.assignTaskToUser(
      taskId,
      interaction.user.id,
    );

    this.logger.log(
      `Task ${task.title} assigned to ${interaction.user.username}`,
    );

    return interaction.reply({
      content: `Task ${task.title} assigned to you`,
      ephemeral: true,
    });
  }

  @Button('CompleteTask/:taskId')
  async completeTaskToMe(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.completeTask(taskId);

    this.logger.log(
      `Task ${task.title} completed by ${interaction.user.username}`,
    );

    return interaction.reply({
      content: `Task ${task.title} completed`,
      ephemeral: true,
    });
  }

  @Button('UnassignTaskToMe/:taskId')
  async unassignTaskToMe(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.unassignTaskToUser(taskId);

    this.logger.log(`Task ${task.title} unassigned`);

    return interaction.reply({
      content: `Task ${task.title} unassigned`,
      ephemeral: true,
    });
  }

  @Button('DeleteTask/:taskId')
  async deleteTask(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.removeById(taskId);

    this.logger.log(`Task ${task.title} deleted`);

    return interaction.reply({
      content: `Task ${task.title} deleted`,
      ephemeral: true,
    });
  }

  @UserSelect('assignTaskToUser/:value')
  async onSelectMenuAssignToTask(
    @Context() [interaction]: UserSelectContext,
    @ComponentParam('value') taskId: string,
  ) {
    this.logger.log(taskId + ' called by ' + interaction.user.username);
    const userId = interaction.values[0];

    await this.userService.findOrCreateUser({
      id: userId,
      name: interaction.user.username,
      avatar: interaction.user.avatar,
    });

    const assignedTask = await this.taskService.assignTaskToUser(
      taskId,
      userId,
    );
    return interaction.reply({
      content: `Task ${assignedTask.title} assigned to <@${userId}>`,
      ephemeral: true,
    });
  }

  @StringSelect('assignTaskToGoal/:value')
  public async assignTaskToGoal(
    @Context() [interaction]: StringSelectContext,
    @ComponentParam('value') taskId: string,
  ) {
    this.logger.log(
      taskId + ' assigned to a goal by ' + interaction.user.username,
    );
    const goalId = interaction.values[0];
    const task = await this.taskService.assignTaskToGoal(taskId, goalId);

    return interaction.reply({
      content: `Task ${task.title} has been assigned to a goal`,
      ephemeral: true,
    });
  }
}
