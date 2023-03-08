import { Injectable } from '@nestjs/common';
import { ColorResolvable } from 'discord.js';

@Injectable()
export class StatusColorPicker {
  public getColor(status: string): ColorResolvable {
    switch (status) {
      case 'not_assigned':
        return 'Red';
      case 'pending':
        return 'Yellow';
      case 'completed':
        return 'Green';
      case 'stuck':
        return 'Red';
      case 'on_hold':
        return 'Grey';
    }
  }
}
