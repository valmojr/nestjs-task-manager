import { Injectable, Logger } from '@nestjs/common';
import { Guild } from '@prisma/client';
import { PrismaService } from 'src/Database/Database.service';

@Injectable()
export class GuildService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger: Logger = new Logger(GuildService.name);

  create(data: Guild) {
    this.logger.log(`Creating guild with data: ${JSON.stringify(data)}`);

    return this.prismaService.guild.create({
      data,
    });
  }

  findAll() {
    this.logger.log('Finding all guilds');

    return this.prismaService.guild.findMany();
  }

  findById(id: string) {
    this.logger.log(`Finding guild with id: ${id}`);

    return this.prismaService.guild.findUnique({ where: { id } });
  }

  findByDiscordId(discordId: string) {
    this.logger.log(`Finding guild with discordId: ${discordId}`);

    return this.prismaService.guild.findMany({ where: { discordId } });
  }

  updateById(id: string, data: Guild) {
    this.logger.log(
      `Updating guild with id: ${id} and data: ${JSON.stringify(data)}`,
    );

    return this.prismaService.guild.update({
      where: { id },
      data,
    });
  }

  update(data: Guild) {
    this.logger.log(`Updating guild with data: ${JSON.stringify(data)}`);

    return this.prismaService.guild.update({
      where: { id: data.id },
      data,
    });
  }

  async checkOrAddUserToGuild(userId: string, guildId: string) {
    const guild = await this.prismaService.guild.findUnique({
      where: { id: guildId },
    });

    if (!guild.userIDs.includes(userId)) {
      guild.userIDs.push(userId);

      return this.update(guild);
    } else {
      return guild;
    }
  }

  removeById(id: string) {
    this.logger.log(`Removing guild with id: ${id}`);

    return this.prismaService.guild.delete({ where: { id } });
  }
}
