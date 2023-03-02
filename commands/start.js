const { SlashCommandBuilder } = require('discord.js');
const startServer = require('../aternos_functions/startServer');
const checkAccess = require('../utils/checkAccess');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start-server')
    .setDescription("start the server if it's already offline"),
  async execute(msg) {
    await msg.deferReply();
    if (checkAccess(msg.member.roles.cache, msg.guild.id, 'start')) {
      let start = await startServer(msg.guild.id);
      return await msg.editReply(start);
    }
    return await msg.editReply({
      ephemeral: true,
      content: "you don't have access",
    });
  },
};
