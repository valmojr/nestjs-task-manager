import { Injectable } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { UserService } from 'src/User/user.service';
import { RegisterUserDTO } from './RegisterUser.dto';

@Injectable()
export class RegisterUserCommand {
  constructor(private readonly userService: UserService) {}

  @SlashCommand({
    name: 'register',
    description: 'Register a user',
  })
  public async register(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: RegisterUserDTO,
  ) {
    const userId = params.username;
    //this.userService.findOrCreateUser
    await interaction.reply('Ok');
  }
}
