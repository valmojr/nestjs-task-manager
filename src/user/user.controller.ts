import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { UserService } from './user.service';
@Controller('user')
@UseGuards(AuthGuard('discord'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data.id, data.name, data.avatar);
  }

  @Patch()
  async updateUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data.id, data.name, data.avatar);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
