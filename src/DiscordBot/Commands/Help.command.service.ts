import { Injectable } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { SlashCommand, Context, SlashCommandContext } from 'necord';

@Injectable()
export class HelpCommand {
  @SlashCommand({
    name: 'help',
    description: 'Help!',
  })
  public async help(@Context() [message]: SlashCommandContext) {
    await message.reply({
      content: 'List of Bot Commands and how to use then',
      embeds: [
        new EmbedBuilder()
          .setTitle('Task Commands')
          .setDescription('Commands for Task Management')
          .setColor('Blue')
          .addFields({
            name: '/create-Task',
            value: 'Popup for creating a new Task',
          })
          .addFields({
            name: '/list-all-tasks',
            value: 'List all Tasks',
          })
          .addFields({
            name: '/check-my-tasks',
            value: 'List all your Tasks',
          })
          .addFields({
            name: '/assign-task-to-user',
            value: 'Assign a Task to a User',
          })
          .addFields({
            name: '/assign-task-to-goal',
            value: 'Assign a Task to a Goal',
          }),
        new EmbedBuilder()
          .setTitle('Goal Commands')
          .setDescription('Commands for Goal Management')
          .setColor('Green')
          .addFields({
            name: '/create-goal',
            value: 'Popup for creating a new Goal',
          })
          .addFields({
            name: '/list-all-goals',
            value: 'List all Goals',
          })
          .addFields({
            name: '/check-my-goals',
            value: 'List all your Goals',
          }),
        new EmbedBuilder()
          .setTitle('User Commands')
          .setDescription('Commands for User Management')
          .setColor('Red')
          .addFields({
            name: '/register-all-guild-members',
            value:
              'Register all Guild Members, if they are not already registered',
          })
          .addFields({
            name: '/remove-the-banished',
            value: 'Remove all users that are no longer in the guild',
          }),
        new EmbedBuilder()
          .setTitle('Misc Commands')
          .setDescription('Commands for Misc Management')
          .setColor('Purple')
          .addFields({
            name: '/ping',
            value: 'Pong!',
          }),
      ],
      ephemeral: true,
    });
  }
}
