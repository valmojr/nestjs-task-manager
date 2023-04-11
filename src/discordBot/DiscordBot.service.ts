import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import * as dotenv from 'dotenv';
import { GuildService } from 'src/guild/guild.service';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DiscordBotService {
  constructor(
    private readonly guildService: GuildService,
    private readonly userService: UserService,
  ) {
    dotenv.config();
  }

  private readonly logger = new Logger(DiscordBotService.name);

  @Once('ready')
  public onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot ${client.user.username} logged in and ready!`);
  }

  @On('warn')
  public onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }

  @On('error')
  public onError(@Context() [error]: ContextOf<'error'>) {
    this.logger.error(error.message.toString());
  }

  @On('guildCreate')
  public async onGuildAdd(@Context() [joinedGuild]: ContextOf<'guildCreate'>) {
    this.logger.log(`Bot added to guild ${joinedGuild.name}`);

    const rawUsers = await joinedGuild.members.fetch();

    const users: Omit<User, 'guildIDs' | 'taskIDs' | 'id'>[] = rawUsers.map(
      (rawUser) => {
        const { id, username, avatar } = rawUser.user;

        return {
          discordId: id,
          name: username,
          avatar,
        };
      },
    );

    users.forEach(async (user) => {
      const userOnDatabase = await this.userService.findByDiscordId(
        user.discordId,
      );

      if (userOnDatabase) {
        if (userOnDatabase.guildIDs.includes(joinedGuild.id)) {
          throw new BadRequestException('User is already on guild');
        } else {
          await this.userService.updateById(userOnDatabase.id, {
            ...userOnDatabase,
            guildIDs: [...userOnDatabase.guildIDs, guild.discordId],
          });
        }
      } else {
        await this.userService.create({
          ...user,
          guildIDs: [joinedGuild.id],
          taskIDs: [],
        });
      }
    });

    const guild = await this.guildService.create({
      discordId: joinedGuild.id,
      name: joinedGuild.name,
      avatar: joinedGuild.iconURL(),
      dashboardChannelId: null,
      userIDs: users.map((user) => user.discordId),
      id: randomUUID(),
    });
  }

  @On('guildDelete')
  public async onGuildRemove(@Context() [leftGuild]: ContextOf<'guildDelete'>) {
    this.logger.log(`Bot removed from guild ${leftGuild.name}`);

    const guild = await this.guildService.findByDiscordId(leftGuild.id);

    if (!guild) {
      throw new BadRequestException('Guild not found');
    }

    await this.guildService.removeById(guild.id);

    const users: User[] = await this.userService.findAll();

    users.forEach(async (user) => {
      if (user.guildIDs.includes(guild.discordId)) {
        await this.userService.updateByDiscordId(user.discordId, {
          ...user,
          guildIDs: user.guildIDs.filter(
            (guildId) => guildId !== guild.discordId,
          ),
        });
      }
    });
  }
}
