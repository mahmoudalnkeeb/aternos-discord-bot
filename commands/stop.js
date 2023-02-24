const { SlashCommandBuilder } = require('discord.js');
const stopServer = require('../aternos_functions/stopServer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop-server')
    .setDescription("stop the server if it's already online"),
  async execute(msg) {
    await msg.deferReplay();
    let stop = await stopServer();
    await msg.editReplay(stop);
  },
};
