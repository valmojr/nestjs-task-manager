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
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger: Logger = new Logger(UserController.name);

  @Post()
  create(@Body() user: User) {
    this.logger.log(
      `User Controller creating user with data: ${JSON.stringify(user)}`,
    );

    return this.userService.create(user);
  }

  @Get()
  findAll() {
    this.logger.log('User Controller finding all users');

    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`User Controller finding user with id: ${id}`);

    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() user: User) {
    this.logger.log(`
      User Controller updating user with id: ${id} and data: ${user}
    `);

    return this.userService.updateById(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.logger.log(`User Controller removing user with id: ${id}`);

    return this.userService.removeById(id);
  }
}
