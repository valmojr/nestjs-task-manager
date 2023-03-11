import { Injectable } from '@nestjs/common';
import { ColorResolvable } from 'discord.js';

@Injectable()
export class GoalStatusColorPicker {
  public static pickColor(status: string): ColorResolvable {
    const statusInteger = parseInt(status, 10);

    if (statusInteger == 0) {
      return '#000';
    }
    if (statusInteger < 25) {
      return 'Orange';
    }
    if (statusInteger < 50) {
      return 'Yellow';
    }
    if (statusInteger < 75) {
      return 'Green';
    }
    if (statusInteger < 100) {
      return 'Blue';
    }
  }
}
