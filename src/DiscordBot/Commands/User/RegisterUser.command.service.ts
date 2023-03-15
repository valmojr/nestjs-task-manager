import { Injectable, Logger } from '@nestjs/common';
import { EmbedBuilder } from 'discord.js';
import { Context, Options, SlashCommand, SlashCommandContext } from 'necord';
import { UserService } from 'src/User/user.service';
import { RegisterUserDTO } from './RegisterUser.dto';

@Injectable()
export class RegisterUserCommand {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(RegisterUserCommand.name);

  @SlashCommand({
    name: 'register-user',
    description: 'Register a selected user',
  })
  async registerAllGuildMembers(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: RegisterUserDTO,
  ) {
    const targetUser = (await interaction.guild.members.fetch(params.userId))
      .user;

    this.logger.log(`Registering user ${targetUser.username}`);

    const registredUser = await this.userService.findOrCreateUser({
      id: targetUser.id,
      name: targetUser.username,
      avatar: targetUser.avatar,
    });

    return await interaction.reply({
      content: `registred ${registredUser.name}`,
      ephemeral: true,
    });
  }
}
