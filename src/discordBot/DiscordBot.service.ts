import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import * as dotenv from 'dotenv';
import { GuildService } from 'src/guild/guild.service';
import { Guild, User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { DashboardHandlerService } from './Handlers/DashboardHandler.service';

@Injectable()
export class DiscordBotService {
  constructor(
    private readonly guildService: GuildService,
    private readonly userService: UserService,
    private readonly dashboardHandlerService: DashboardHandlerService,
  ) {
    dotenv.config();
  }

  private readonly logger = new Logger(DiscordBotService.name);

  @Once('ready')
  public async onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot ${client.user.username} logged in and ready!`);

    this.dashboardHandlerService.run(client);
  }

  @On('warn')
  public async onWarn(@Context() [message]: ContextOf<'warn'>) {
    this.logger.warn(message);
  }

  @On('error')
  public onError(@Context() [error]: ContextOf<'error'>) {
    this.logger.error(error.message.toString());
  }

  @On('guildCreate')
  public async onGuildAdd(@Context() [joinedGuild]: ContextOf<'guildCreate'>) {
    this.logger.log(`Bot added to guild ${joinedGuild.name}`);

    const rawUsers = (await joinedGuild.members.fetch()).filter(
      (user) => user.user.bot === false,
    );

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
            guildIDs: [...userOnDatabase.guildIDs, joinedGuild.id],
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

    await this.guildService.create({
      discordId: joinedGuild.id,
      name: joinedGuild.name,
      avatar: joinedGuild.iconURL(),
      requiredRole: null,
      maxTaskLevel: null,
      dashboardChannelId: null,
      userIDs: users.map((user) => user.discordId),
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

  @On('channelDelete')
  public async onChannelDelete(
    @Context() [channel]: ContextOf<'channelDelete'>,
  ) {
    const guildDashboardChannel: Guild =
      await this.guildService.findByDashboardChannelId(channel.id);

    if (guildDashboardChannel) {
      this.logger.log(
        `Guild ${guildDashboardChannel.name} deleted dashboard channel`,
      );

      await this.guildService.updateById(guildDashboardChannel.id, {
        ...guildDashboardChannel,
        dashboardChannelId: null,
      });
    }
  }

  @On('guildMemberAdd')
  async onGuildMemberAdd(@Context() [member]: ContextOf<'guildMemberAdd'>) {
    const guild = await this.guildService.findByDiscordId(member.guild.id);

    if (!guild) {
      throw new BadRequestException('Guild not found');
    }

    const user = await this.userService.findByDiscordId(member.user.id);

    if (!user) {
      await this.userService.create({
        discordId: member.user.id,
        name: member.user.username,
        avatar: member.user.avatar,
        guildIDs: [guild.discordId],
        taskIDs: [],
      });
    } else {
      if (user.guildIDs.includes(guild.discordId)) {
        throw new BadRequestException('User is already on guild');
      } else {
        await this.userService.updateById(user.id, {
          ...user,
          guildIDs: [...user.guildIDs, guild.discordId],
        });
      }
    }

    await this.guildService.updateById(guild.id, {
      ...guild,
      userIDs: [...guild.userIDs, member.user.id],
    });
  }
}
