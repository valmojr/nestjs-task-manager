import { EmbedBuilder, RGBTuple } from '@discordjs/builders';
import { Injectable } from '@nestjs/common';
import { Goal } from '@prisma/client';
import { ColorResolvable } from 'discord.js';

@Injectable()
export class EmbedGoalCreator {
  public createGoalEmbed(goal: Goal) {
    const statusColor = (status: string): ColorResolvable => {
      const statusInteger = parseInt(status);

      if (statusInteger == 0) {
        return 'Red';
      } else if (statusInteger < 25) {
        return 'Orange';
      } else if (statusInteger < 50) {
        return 'Yellow';
      } else if (statusInteger < 75) {
        return 'Green';
      } else if (statusInteger < 100) {
        return 'Blue';
      } else {
        return '#000';
      }
    };

    return new EmbedBuilder()
      .setTitle(goal.title)
      .setDescription(goal.description)
      .setColor(statusColor(goal.status));
  }
}
