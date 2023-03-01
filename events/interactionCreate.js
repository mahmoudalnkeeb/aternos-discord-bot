const { Events } = require('discord.js');
let { serverConfig } = require('../configs/config');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.channel.id !== serverConfig.channel) return;
    if (interaction.guild == null)
      return await interaction.reply({
        ephemeral: true,
        content: 'sorry commands allowed only in servers',
      });
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`);
      console.error(error);
    }
  },
};
