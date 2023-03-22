import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} from '@discordjs/builders';
import { Injectable, Logger } from '@nestjs/common';
import {
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  TextInputStyle,
  UserSelectMenuBuilder,
} from 'discord.js';
import {
  Button,
  ButtonContext,
  ComponentParam,
  Context,
  Ctx,
  Modal,
  ModalContext,
  SlashCommand,
  SlashCommandContext,
  StringSelect,
  StringSelectContext,
  UserSelect,
  UserSelectContext,
} from 'necord';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { GoalService } from 'src/goal/goal.service';
import { TaskInput } from 'src/task/entity/Task.entity';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';

@Injectable()
export class CreateTaskCommandService {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly goalService: GoalService,
  ) {}
  private logger = new Logger(CreateTaskCommandService.name);

  @SlashCommand({
    name: 'create-task',
    description: 'Create a task',
  })
  async createTaskModalCaller(@Context() [interaction]: SlashCommandContext) {
    this.logger.log('Create task command called');
    return interaction.showModal(
      new ModalBuilder()
        .setTitle('Create Task')
        .setCustomId('createTask')
        .setComponents([
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setLabel('Title')
              .setCustomId('taskName')
              .setPlaceholder('Title')
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setLabel('Description')
              .setCustomId('taskDescription')
              .setPlaceholder('Description')
              .setRequired(false)
              .setStyle(TextInputStyle.Paragraph),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setLabel('Image URL')
              .setCustomId('taskImage')
              .setPlaceholder('Image URL')
              .setRequired(false)
              .setStyle(TextInputStyle.Short),
          ]),
        ]),
    );
  }

  @Modal('createTask')
  async createTaskModalHandler(@Ctx() [interaction]: ModalContext) {
    const imputedTask: TaskInput = {
      title: interaction.fields.getTextInputValue('taskName'),
      description: interaction.fields.getTextInputValue('taskDescription'),
      image: interaction.fields.getTextInputValue('taskImage'),
    };

    const createdTask = await this.taskService.create(imputedTask);

    const goals = await this.goalService.findAll();

    const goalOptions = goals.map((goal) => ({
      label: goal.title,
      value: goal.id.toString(),
    }));

    return interaction.reply({
      embeds: [EmbedGeneratorService.createTaskEmbed(createdTask)],
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder()
            .setCustomId(`AddMoreInfo/${createdTask.id.toString()}`)
            .setLabel('Add more info')
            .setEmoji('📝')
            .setStyle(ButtonStyle.Primary),
        ),
      ],
      ephemeral: true,
    });
  }

  @Button('AddMoreInfo/:value')
  async addMoreInfoButtonHandler(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') taskId: string,
  ) {
    this.logger.log(
      taskId + 'AddMoreInfo function called by ' + interaction.user.username,
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
          new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
            new UserSelectMenuBuilder()
              .setCustomId(`assignThisTask/${taskId}`)
              .setPlaceholder('Assign to anyone')
              .setMaxValues(1)
              .setMinValues(1),
          ),
        ],
      });
    } else {
      return interaction.reply({
        content: `Add more info:`,
        components: [
          new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(
            new UserSelectMenuBuilder()
              .setCustomId(`assignTaskToUser/${taskId}`)
              .setPlaceholder('Assign to anyone')
              .setMaxValues(1)
              .setMinValues(1),
          ),
          new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
            new StringSelectMenuBuilder()
              .setCustomId(`assignTaskToGoal/${taskId}`)
              .setPlaceholder('Assign to a goal')
              .setMaxValues(1)
              .setMinValues(1)
              .addOptions(goalOptions),
          ),
          new ActionRowBuilder<ButtonBuilder>().addComponents([
            new ButtonBuilder()
              .setCustomId(`AssignTaskToMe/${taskId}`)
              .setLabel('Assign to me')
              .setEmoji('👍')
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId(`deleteThisTask/${taskId}`)
              .setLabel('Delete this task')
              .setEmoji('🗑️')
              .setStyle(ButtonStyle.Danger),
          ]),
        ],
        ephemeral: true,
      });
    }
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

  @Button('AssignTaskToMe/:value')
  public async assignTaskToMe(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') taskId: string,
  ) {
    const task = await this.taskService.assignTaskToUser(
      taskId,
      interaction.user.id,
    );

    this.logger.log(task.title + ' assigned to ' + interaction.user.username);

    return interaction.reply({
      content: `Task ${task.title} has been assigned to you`,
      ephemeral: true,
    });
  }

  @Button('deleteThisTask/:value')
  public async deleteThisTask(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') taskId: string,
  ) {
    const task = await this.taskService.removeById(taskId);

    this.logger.log(task.title + ' deleted by ' + interaction.user.username);

    return interaction.reply({
      content: `Task ${task.title} has been deleted`,
      ephemeral: true,
    });
  }
}
