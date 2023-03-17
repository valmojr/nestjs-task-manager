import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';
import { NecordModule } from 'necord';
import { PrismaService } from './Database/Prisma.service';
import { DiscordBotCommandsModule } from './DiscordBot/Commands/Commands.module';
import { DiscordBotService } from './DiscordBot/DiscordBot.service';
import { TaskModule } from './Task/Task.module';
import { UserModule } from './User/User.module';
import { GoalModule } from './goal/goal.module';
import { AuthModule } from './auth/auth.module';
import { SubversionModule } from './subversion/subversion.module';
@Module({
  imports: [
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.AutoModerationConfiguration,
        IntentsBitField.Flags.AutoModerationExecution,
      ],
      prefix: '!',
      development: [process.env.DISCORD_DEV_GUILD_ID],
    }),
    DiscordBotCommandsModule,
    TaskModule,
    UserModule,
    GoalModule,
    AuthModule,
    SubversionModule,
  ],
  controllers: [],
  providers: [PrismaService, DiscordBotService],
})
export class AppModule {}
