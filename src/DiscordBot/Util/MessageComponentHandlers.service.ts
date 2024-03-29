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
import AssignTaskToMeButton from './Buttons/AssignTaskToMe.button';
import DeleteTaskButton from './Buttons/DeleteTaskButton';
import _ButtonRow from './Buttons/_ButtonRow';
import { MessageGeneratorService } from './Messanger/MessageGenerator.service';
import CreateGoalModal from './Modals/CreateGoal.modal';
import CreateTaskModal from './Modals/CreateTask.modal';
import EditGoalModal from './Modals/EditGoal.modal';
import EditTaskModal from './Modals/EditTask.modal';
import AssignTaskToGoalStringSelectMenu from './SelectMenus/AssignTaskToGoal.StringSelectMenu';
import AssignTaskToUserUserSelectMenu from './SelectMenus/AssignTaskToUser.UserSelectMenu';

@Injectable()
export class MessageComponentHandlersService {
  constructor(
    private readonly taskService: TaskService,
    private readonly goalService: GoalService,
    private readonly userService: UserService,
    private readonly messageGeneratorService: MessageGeneratorService,
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

    await this.messageGeneratorService.editTaskMessage([interaction], task);

    return interaction.update({});
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

    await this.messageGeneratorService.editTaskMessage([interaction], task);

    return interaction.update({});
  }

  @Button('UnassignTask/:taskId')
  async unassignTaskToMe(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.unassignTaskToUser(taskId);

    this.logger.log(`Task ${task.title} unassigned`);

    await this.messageGeneratorService.editTaskMessage([interaction], task);

    return interaction.update({});
  }

  @Button('DeleteTask/:taskId')
  async deleteTask(
    @Ctx() [interaction]: ButtonContext,
    @ComponentParam('taskId') taskId: string,
  ) {
    const task = await this.taskService.removeById(taskId);

    this.logger.log(
      `Task ${task.title} deleted by ${interaction.user.username}`,
    );

    await interaction.message.delete();

    return interaction.update({});
  }

  @Button('AddMoreInfoToTask/:value')
  async addMoreInfoButtonHandler(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') taskId: string,
  ) {
    const task = await this.taskService.findById(taskId);

    this.logger.log(
      `Task ${task.title} AddMoreInfo button pressed by ${interaction.user.username}`,
    );

    const goals = await this.goalService.findAll();
    const goalOptions = goals.map((goal) => ({
      label: goal.title,
      value: goal.id.toString(),
    }));

    if (goals.length === 0) {
      return interaction.reply({
        content: `Add more info:`,
        components: [
          AssignTaskToUserUserSelectMenu(task.id),
          _ButtonRow([
            AssignTaskToMeButton(task.id),
            DeleteTaskButton(task.id),
          ]),
        ],
      });
    } else {
      return interaction.reply({
        content: `Add more info:`,
        components: [
          AssignTaskToUserUserSelectMenu(task.id),
          AssignTaskToGoalStringSelectMenu(task.id, goalOptions),
          _ButtonRow([
            AssignTaskToMeButton(task.id),
            DeleteTaskButton(task.id),
          ]),
        ],
        ephemeral: true,
      });
    }
  }

  @Button('CreateTask')
  async createTaskButtonHandler(@Context() [interaction]: ButtonContext) {
    return interaction.showModal(CreateTaskModal());
  }

  @Button('CheckMissingGoalTasks/:value')
  async checkMissingGoalTasksButtonHandler(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') goalId: string,
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
        this.messageGeneratorService.createTaskEmbed(task),
      ),
    );

    return interaction.reply({
      content: `Missing tasks for ${goal.title}: ${missingTasks.length}`,
      embeds: embedMissingTasks,
      ephemeral: true,
    });
  }

  @Button('CreateGoal')
  async createGoalButtonHandler(@Context() [interaction]: ButtonContext) {
    interaction.showModal(CreateGoalModal());
  }

  @Button('EditTask/:value')
  async editTaskButtonHandler(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') taskId: string,
  ) {
    const task = await this.taskService.findById(taskId);

    this.logger.log(
      `${task.title} EditTask button pressed by ${interaction.user.username}`,
    );

    return interaction.showModal(EditTaskModal(taskId));
  }

  @Button('EditGoal/:value')
  async editGoalButtonHandler(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') goalId: string,
  ) {
    const goal = await this.goalService.findById(goalId);

    await this.goalService.updateStatus(goalId);

    this.logger.log(
      `${goal.title} EditGoal button pressed by ${interaction.user.username}`,
    );

    interaction.showModal(EditGoalModal(goalId));
  }

  @Button('DeleteGoal/:value')
  async deleteGoalButtonHandler(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') goalId: string,
  ) {
    const goal = await this.goalService.removeById(goalId);

    this.logger.log(
      `${goal.title} DeleteGoal button pressed by ${interaction.user.username}`,
    );

    return interaction.update({});
  }

  @Button('UpdateGoalStatus/:value')
  async updateGoalStatusButtonHandler(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') goalId: string,
  ) {
    const goal = await this.goalService.updateStatus(goalId);

    this.logger.log(
      `${goal.title} UpdateGoalStatus button pressed by ${interaction.user.username}`,
    );

    await this.messageGeneratorService.editGoalMessage([interaction], goal);

    return interaction.update({});
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

    await this.messageGeneratorService.createTaskEmbed(assignedTask);

    return interaction.update({});
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
    const assignedTask = await this.taskService.assignTaskToGoal(
      taskId,
      goalId,
    );

    await this.goalService.updateStatus(goalId);

    await this.messageGeneratorService.createTaskEmbed(assignedTask);

    return interaction.update({});
  }
}
