import { Module } from '@nestjs/common';
import { PrismaService } from './Database/Prisma.service';
import { DiscordBotModule } from './DiscordBot/DiscordBot.module';
import { TaskModule } from './Task/Task.module';
import { UserModule } from './User/User.module';
import { GoalModule } from './goal/goal.module';
import { AuthModule } from './auth/auth.module';
import { SubversionModule } from './subversion/subversion.module';
@Module({
  imports: [
    DiscordBotModule,
    TaskModule,
    UserModule,
    GoalModule,
    AuthModule,
    SubversionModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
