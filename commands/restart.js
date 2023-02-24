const { SlashCommandBuilder } = require('discord.js');
const restartServer = require('../aternos_functions/restartServer');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart-server')
    .setDescription("restart the server if it's already online"),
  async execute(msg) {
    await msg.deferRepaly();
    let restart = await restartServer();
    await msg.editReplay(restart);
  },
};
