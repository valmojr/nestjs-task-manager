import { Injectable, Logger } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext } from 'necord';
import { UserService } from 'src/User/user.service';

@Injectable()
export class RegisterAllGuildMembersCommand {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(RegisterAllGuildMembersCommand.name);

  @SlashCommand({
    name: 'register-all-guild-members',
    description: 'Register all guild members',
  })
  async registerAllGuildMembers(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(
      `Registering all guild members from ${interaction.guild.name}`,
    );
    const members = interaction.guild.members.cache;

    members.forEach(async (member) => {
      this.logger.log(`Find or Creating Entity for ${member.user.username}`);

      await this.userService.findOrCreateUser({
        id: member.user.id,
        name: member.user.username,
        avatar: member.user.avatar,
      });
    });

    return await interaction.reply({
      content: `Registered ${members.size} members`,
      ephemeral: true,
    });
  }
}
