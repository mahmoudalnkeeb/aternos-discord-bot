const { SlashCommandBuilder } = require('discord.js');
const checkStatus = require('../aternos_functions/checkServerStatus');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('check-status')
    .setDescription(
      'check the server status (online || offline || running || starting)'
    ),
  async execute(msg) {
    await msg.deferReply();
    let status = await checkStatus();
    await msg.editReplay(status);
  },
};
