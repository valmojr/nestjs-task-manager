import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On } from 'necord';
import * as dotenv from 'dotenv';
import { GuildService } from 'src/guild/guild.service';
import { Guild, User } from '@prisma/client';
import { randomUUID } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DiscordBotService {
  constructor() {
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
    let guildService: GuildService;
    let userService: UserService;

    const guildMembers: User[] = joinedGuild.members.cache.map((member) => {
      return {
        id: member.id,
        name: member.user.username,
        avatar: member.user.avatarURL(),
        guildIDs: [joinedGuild.id],
        taskIDs: [],
      };
    });

    guildMembers.forEach((member) => {
      userService.findOrCreate(member);
    });

    const guild: Guild = {
      id: randomUUID(),
      discordId: joinedGuild.id,
      name: joinedGuild.name,
      avatar: joinedGuild.iconURL(),
      dashboardChannelId: null,
      userIDs: guildMembers.map((member) => member.id),
    };

    guildService.create(guild);
  }
}
