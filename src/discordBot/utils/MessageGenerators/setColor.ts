import { ColorResolvable } from 'discord.js';

export default (status: number): ColorResolvable => {
  if (status === 100) {
    return 'Green';
  } else if (status > 70) {
    return 'Yellow';
  } else if (status > 50) {
    return 'Orange';
  } else if (status > 25) {
    return 'Red';
  } else {
    return 'DarkRed';
  }
};
