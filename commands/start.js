const { SlashCommandBuilder } = require('discord.js');
const startServer = require('../aternos_functions/startServer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start-server')
    .setDescription("start the server if it's already offline"),
  async execute(msg) {
    await msg.deferRepaly();
    let start = await startServer();
    await msg.editReplay(start);
  },
};
