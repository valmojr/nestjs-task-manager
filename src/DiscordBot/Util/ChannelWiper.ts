import { SlashCommandContext } from 'necord';

export default async ([interaction]: SlashCommandContext) => {
  let interaction_size = 100;
  while (interaction_size == 100) {
    await interaction.channel
      .bulkDelete(100)
      .then((messages) => (interaction_size = messages.size))
      .catch(console.error);
  }
};
