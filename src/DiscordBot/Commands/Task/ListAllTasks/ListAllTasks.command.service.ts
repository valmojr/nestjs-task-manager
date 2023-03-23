import { Injectable } from '@nestjs/common';
import { Ctx, SlashCommand, SlashCommandContext } from 'necord';
import { TaskService } from 'src/task/task.service';
import { EmbedGeneratorService } from 'src/DiscordBot/Util/EmbedGenerator.service';

@Injectable()
export class ListAllTasksCommand {
  constructor(
    private readonly taskService: TaskService,
    private readonly embedGeneratorService: EmbedGeneratorService,
  ) {}

  @SlashCommand({
    name: 'list-all-tasks',
    description: 'List all tasks',
  })
  public async onListAllTasksCommand(
    @Ctx() [interaction]: SlashCommandContext,
  ) {
    const tasks = await this.taskService.findAll();

    const embedTasks = await Promise.all(
      tasks.map(
        async (task) => await this.embedGeneratorService.createTaskEmbed(task),
      ),
    );

    return interaction.reply({
      embeds: [...embedTasks],
      ephemeral: true,
    });
  }
}
