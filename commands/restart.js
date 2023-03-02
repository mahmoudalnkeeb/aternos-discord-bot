const { SlashCommandBuilder } = require('discord.js');
const restartServer = require('../aternos_functions/restartServer');
const checkAccess = require('../utils/checkAccess');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('restart-server')
    .setDescription("restart the server if it's already online"),
  async execute(msg) {
    await msg.deferReply();
    if (checkAccess(msg.member.roles.cache, msg.guild.id, 'restart')) {
      let restart = await restartServer(msg.guild.id);
      return await msg.editReply(restart);
    }
    return await msg.editReply({
      ephemeral: true,
      content: "you don't have access",
    });
  },
};
