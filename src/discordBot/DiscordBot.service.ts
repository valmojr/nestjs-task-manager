import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import * as dotenv from 'dotenv';
import { GuildService } from 'src/guild/guild.service';
import { Guild, User } from '@prisma/client';
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
  public async onGuildMemberAdd(
    @Context() [joinedGuild]: ContextOf<'guildCreate'>,
  ) {
    this.logger.log(`Bot added to guild ${joinedGuild.name}`);

    const guild: Guild = {
      id: randomUUID(),
      discordId: joinedGuild.id,
      name: joinedGuild.name,
      avatar: joinedGuild.iconURL(),
      dashboardChannelId: null,
      userIDs: [],
    };

    this.guildService.create(guild);

    joinedGuild.members.cache.forEach(async (member) => {
      this.guildService.checkOrAddUserToGuild(member.id, joinedGuild.id);

      const user: User = {
        id: randomUUID(),
        discordId: member.id,
        name: member.user.username,
        avatar: member.user.avatarURL(),
        guildIDs: [],
        taskIDs: [],
      };

      this.userService.findOrCreate(user);
    });
  }
}
