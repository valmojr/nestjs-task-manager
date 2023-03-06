import { STATUS } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { ColorResolvable } from 'discord.js';

@Injectable()
export class StatusColorPicker {
  public getColor(status: STATUS): ColorResolvable {
    switch (status) {
      case 'not_assigned':
        return 'Red';
      case 'pending':
        return 'Yellow';
      case 'done':
        return 'Green';
      case 'stuck':
        return 'Red';
      case 'cancelled':
        return 'Grey';
    }
  }
}
