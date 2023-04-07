import { Module } from '@nestjs/common';
import { GuildService } from './guild.service';
import { GuildController } from './guild.controller';
import { PrismaService } from 'src/Database/Database.service';

@Module({
  controllers: [GuildController],
  providers: [GuildService, PrismaService],
})
export class GuildModule {}
