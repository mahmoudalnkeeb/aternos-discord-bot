const { SlashCommandBuilder } = require('discord.js');
const stopServer = require('../aternos_functions/stopServer');
const checkAccess = require('../utils/checkAccess');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop-server')
    .setDescription("stop the server if it's already online"),
  async execute(msg) {
    await msg.deferReply();
    if (checkAccess(msg.member.roles.cache, msg.guild.id, 'stop')) {
      let stop = await stopServer(msg.guild.id);
      return await msg.editReply(stop);
    }
    return await msg.editReply({
      ephemeral: true,
      content: "you don't have access",
    });
  },
};
