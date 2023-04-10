import { Injectable, Logger } from '@nestjs/common';
import { Guild } from '@prisma/client';
import { PrismaService } from 'src/Database/Database.service';

@Injectable()
export class GuildService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger: Logger = new Logger(GuildService.name);

  async create(data: Guild): Promise<Guild> {
    this.logger.log(`Creating guild with data: ${JSON.stringify(data)}`);

    // check if guild already exists
    const guild = await this.findByDiscordId(data.discordId);
    if (guild) {
      throw new Error(`Guild with id ${data.discordId} already exists`);
    }

    return this.prismaService.guild.create({
      data,
    });
  }

  async findAll(): Promise<Guild[]> {
    this.logger.log('Finding all guilds');

    return this.prismaService.guild.findMany();
  }

  async findById(id: string): Promise<Guild> {
    this.logger.log(`Finding guild with id: ${id}`);

    return this.prismaService.guild.findUnique({ where: { id } });
  }

  async findByDiscordId(discordId: string): Promise<Guild> {
    this.logger.log(`Finding guild with discordId: ${discordId}`);

    return this.prismaService.guild.findUnique({ where: { discordId } });
  }

  async updateById(id: string, data: Guild): Promise<Guild> {
    this.logger.log(
      `Updating guild with id: ${id} and data: ${JSON.stringify(data)}`,
    );

    return this.prismaService.guild.update({
      where: { id },
      data,
    });
  }

  async update(data: Guild): Promise<Guild> {
    this.logger.log(`Updating guild with data: ${JSON.stringify(data)}`);

    const { id, ...updateData } = data;

    return this.prismaService.guild.update({
      where: { id },
      data: updateData,
    });
  }

  async setDashboardChannel(
    guildId: string,
    channelId: string,
  ): Promise<Guild> {
    this.logger.log(
      `Setting dashboard channel for guild with id: ${guildId} to channel with id: ${channelId}`,
    );

    const guild = await this.findByDiscordId(guildId);

    return this.updateById(guildId, {
      ...guild,
      dashboardChannelId: channelId,
    });
  }

  async checkOrAddUserToGuild(
    userId: string,
    discordId: string,
  ): Promise<Guild> {
    const guild: Guild = await this.prismaService.guild.findUnique({
      where: { discordId },
    });

    if (!guild) {
      this.logger.error(`Guild with id ${discordId} not found`);
      throw new Error(`Guild with id ${discordId} not found`);
    }

    if (!guild.userIDs || !guild.userIDs.includes(userId)) {
      guild.userIDs = guild.userIDs || [];
      guild.userIDs.push(userId);

      return this.update(guild);
    } else {
      return guild;
    }
  }

  async removeById(id: string): Promise<Guild> {
    this.logger.log(`Removing guild with id: ${id}`);

    return this.prismaService.guild.delete({ where: { id } });
  }
}
