import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { GuildService } from './guild.service';
import { Guild } from '@prisma/client';

@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}
  private readonly logger: Logger = new Logger(GuildController.name);

  @Post()
  create(@Body() guild: Guild) {
    this.logger.log(
      `Guild Controller creating guild with data: ${JSON.stringify(guild)}`,
    );

    return this.guildService.create(guild);
  }

  @Get()
  findAll() {
    this.logger.log('Guild Controller finding all guilds');

    return this.guildService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`Guild Controller finding guild with id: ${id}`);

    return this.guildService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() guild: Guild) {
    this.logger.log(`
      Guild Controller updating guild with id: ${id} and data: ${JSON.stringify(
      guild,
    )}  
    `);

    return this.guildService.updateById(id, guild);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guildService.removeById(id);
  }
}
