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
import AssignTaskToMeButton from 'src/DiscordBot/Util/Buttons/AssignTaskToMe.button';
import DeleteTaskButton from 'src/DiscordBot/Util/Buttons/DeleteTaskButton';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import AssignTaskToGoalStringSelectMenu from 'src/DiscordBot/Util/SelectMenus/AssignTaskToGoal.StringSelectMenu';
import AssignTaskToUserUserSelectMenu from 'src/DiscordBot/Util/SelectMenus/AssignTaskToUser.UserSelectMenu';
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
    private readonly embedGeneratorService: EmbedGeneratorService,
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

    return interaction.reply({
      embeds: [await this.embedGeneratorService.createTaskEmbed(createdTask)],
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
        components: [AssignTaskToUserUserSelectMenu(taskId)],
      });
    } else {
      return interaction.reply({
        content: `Add more info:`,
        components: [
          AssignTaskToUserUserSelectMenu(taskId),
          AssignTaskToGoalStringSelectMenu(taskId, goalOptions),
          new ActionRowBuilder<ButtonBuilder>().addComponents([
            AssignTaskToMeButton(taskId),
            DeleteTaskButton(taskId),
          ]),
        ],
        ephemeral: true,
      });
    }
  }
}
