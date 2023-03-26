import { Injectable } from '@nestjs/common';
import { ColorResolvable } from 'discord.js';

@Injectable()
export class StatusColorPicker {
  public static getGoalColor(status: number): ColorResolvable {
    if (
      status == 0 ||
      status == null ||
      status == undefined ||
      status < 0 ||
      status > 100 ||
      isNaN(status)
    ) {
      return 'DarkButNotBlack';
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
    } else {
      return 'DarkButNotBlack';
    }
  }

  public static getTaskColor(status: string): ColorResolvable {
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
      default:
        return 'Grey';
    }
  }

  public static getGoalEmoji(status: number): string {
    if (
      status === 0 ||
      status === null ||
      status === undefined ||
      status < 0 ||
      status > 100 ||
      isNaN(status)
    ) {
      return `${status}% - :anchor:`;
    } else if (status === 100) {
      return `**GOAL COMPLETE!** - :beginner::fire::fire::fire::fire::fire::fire::fire::fire::fire::fire: :white_check_mark: `;
    } else if (status > 90) {
      return `${status}% - :beginner::fire::fire::fire::fire::fire::fire::fire::fire::fire: :rocket: :dart:`;
    } else if (status > 80) {
      return `${status}% - :beginner::fire::fire::fire::fire::fire::fire::fire: :rocket:              :dart: `;
    } else if (status > 70) {
      return `${status}% - :beginner::fire::fire::fire::fire::fire::fire: :rocket:                     :dart: `;
    } else if (status > 60) {
      return `${status}% - :beginner::fire::fire::fire::fire::fire: :rocket:                            :dart: `;
    } else if (status > 50) {
      return `${status}% - :beginner::fire::fire::fire::fire: :rocket:                                   :dart: `;
    } else if (status > 40) {
      return `${status}% - :beginner::fire::fire::fire: :rocket:                                          :dart: `;
    } else if (status > 30) {
      return `${status}% - :beginner::fire::fire: :rocket:                                                 :dart: `;
    } else if (status > 20) {
      return `${status}% - :beginner::fire::fire::rocket:                                                   :dart: `;
    } else if (status > 10) {
      return `${status}% - :beginner::fire::rocket:                                                          :dart: `;
    } else if (status > 0) {
      return `${status}% - :beginner: :rocket:                                                                :dart: `;
    } else {
      return `${status}% - :anchor:`;
    }
  }
}
