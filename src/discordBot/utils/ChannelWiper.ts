import { TextChannel } from 'discord.js';

export default async (channel: TextChannel) => {
  let interaction_size = 100;
  while (interaction_size == 100) {
    await channel
      .bulkDelete(100)
      .then((messages) => (interaction_size = messages.size))
      .catch(console.error);
  }
};
