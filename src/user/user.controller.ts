import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Get()
  findAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Patch(':id')
  updateByID(@Param('id') id: string, @Body() user: User) {
    return this.userService.updateUserByID(id, user);
  }

  @Patch()
  update(@Body() user: User) {
    return this.userService.updateUser(user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUserById(id);
  }

  @Delete()
  removeByObject(@Body() user: User) {
    return this.userService.deleteUserByObject(user);
  }
}
