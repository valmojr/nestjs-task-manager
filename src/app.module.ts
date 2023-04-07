import { Module } from '@nestjs/common';
import { GuildModule } from './guild/guild.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [GuildModule, ReminderModule, UserModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
