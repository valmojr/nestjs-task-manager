import { Injectable, UseInterceptors } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { StatusAutoCompleteInterceptor } from '../util/status.interceptor.service';
import { CreateTaskDTO } from './CreateTask.dto';
import { EmbedTaskService } from 'src/DiscordBot/Commands/Task/util/embedTask.service';
import { CreateTaskHandler } from './CreateTaskHandler.service';
import {
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

@Injectable()
export class CreateTaskCommand extends CreateTaskHandler {
  @SlashCommand({
    name: 'create-task',
    description: 'Create Task Popup',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async createTaskModal(@Context() [interaction]: SlashCommandContext) {
    return interaction.showModal(
      new ModalBuilder()
        .setTitle('Create Task')
        .setCustomId('taskcreationmodal')
        .setComponents([
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('title')
              .setLabel('Title')
              .setPlaceholder('Title')
              .setRequired(true)
              .setStyle(TextInputStyle.Short),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('description')
              .setLabel('Description')
              .setPlaceholder('Description')
              .setRequired(true)
              .setStyle(TextInputStyle.Paragraph),
          ]),
          new ActionRowBuilder<TextInputBuilder>().addComponents([
            new TextInputBuilder()
              .setCustomId('image')
              .setLabel('Image URL')
              .setPlaceholder('Image URL')
              .setRequired(false)
              .setStyle(TextInputStyle.Short),
          ]),
        ]),
    );
  }

  @UseInterceptors(StatusAutoCompleteInterceptor)
  @SlashCommand({
    name: 'create-task-by-slash',
    description: 'Create a task by slash commands!',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskCreation(
    @Context() [interaction]: SlashCommandContext,
    @Options() task: CreateTaskDTO,
  ) {
    const newTask = await this.taskCreatorHandler(
      task,
      interaction.user.username,
    );

    return await interaction.reply({
      embeds: [EmbedTaskService.createTaskEmbed(newTask)],
    });
  }
}
