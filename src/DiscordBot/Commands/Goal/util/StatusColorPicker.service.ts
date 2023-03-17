import { Injectable } from '@nestjs/common';
import { ColorResolvable } from 'discord.js';

@Injectable()
export class StatusColorPicker {
  public getColor(status: number): ColorResolvable {
    if (status == 0) {
      return '#000';
    } else if (status < 25) {
      return 'Red';
    } else if (status < 50) {
      return 'Orange';
    } else if (status < 75) {
      return 'Yellow';
    } else if (status < 100) {
      return 'Green';
    } else if (status == 100) {
      return 'Blue';
    }
  }
}
