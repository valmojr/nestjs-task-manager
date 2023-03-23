import { Injectable, Logger } from '@nestjs/common';
import { SlashCommand, Context, SlashCommandContext, Options } from 'necord';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';
import { AssignTaskToUserDTO } from './AssignTaskToUser.dto';
import { TaskService } from 'src/task/task.service';
import { UserService } from 'src/User/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AssignTaskToUserCommand extends EmbedGeneratorService {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {
    super();
  }

  private logger = new Logger(AssignTaskToUserCommand.name);

  @SlashCommand({
    name: 'assign-task-to-user',
    description: 'Assign a task to a user',
    guilds: [process.env.DISCORD_DEV_GUILD_ID],
  })
  public async onSlashTaskAssign(
    @Context() [interaction]: SlashCommandContext,
    @Options() params: AssignTaskToUserDTO,
  ) {
    const currentTask = await this.taskService.findById(params.taskId);

    if (!currentTask) {
      return 'Task not found';
    }

    const fetchedUser = interaction.guild.members.resolve(params.userId).user;

    const assignedUser: User = {
      ...fetchedUser,
      name: fetchedUser.username,
    };

    await this.userService.findOrCreateUser(assignedUser);

    const assignedTask = await this.taskService.updateById(params.taskId, {
      id: currentTask.id,
      title: currentTask.title,
      description: currentTask.description,
      image: currentTask.image,
      status: 'pending',
      dueDate: currentTask.dueDate,
      goalId: currentTask.goalId,
      userId: assignedUser.id,
    });

    this.logger.log(
      `Task ${currentTask.title} assigned to ${assignedUser.name}`,
    );

    return await interaction.reply({
      content: `${currentTask.title} assigned to ${params.userId}`,
      embeds: [await this.embedGeneratorService.createTaskEmbed(assignedTask)],
    });
  }
}
