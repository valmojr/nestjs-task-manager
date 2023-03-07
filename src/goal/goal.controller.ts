import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Goal } from '.prisma/client';
import { GoalService } from './goal.service';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() goal: Goal) {
    return this.goalService.create(goal);
  }

  @Get()
  findAll() {
    return this.goalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalService.findById(id);
  }

  @Get('user/:id')
  findByUserId(@Param('id') id: string) {
    return this.goalService.findByUserId(id);
  }

  @Get('task/:id')
  findByTaskId(@Param('id') id: string) {
    return this.goalService.findByTaskId(id);
  }

  @Patch()
  update(@Body() goal: Goal) {
    return this.goalService.update(goal);
  }

  @Patch(':id')
  updateByID(@Param('id') id: string, @Body() goal: Goal) {
    return this.goalService.updateById(id, goal);
  }

  @Delete()
  remove(@Body() goal: Goal) {
    return this.goalService.remove(goal);
  }

  @Delete(':id')
  removeById(@Param('id') id: string) {
    return this.goalService.removeById(id);
  }
}
