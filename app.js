require('dotenv').config();
const { Client, Events, GatewayIntentBits } = require('discord.js');
const startServer = require('./aternos_functions/startServer');
const checkStatus = require('./aternos_functions/checkServerStatus');
const stopServer = require('./aternos_functions/stopServer');
const restartServer = require('./aternos_functions/restartServer');
const checkAccess = require('./utils/checkAccess');
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.login(token);

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  try {
    switch (interaction.commandName) {
      case 'check-status':
        await interaction.deferReply();
        let status = await checkStatus();
        await interaction.editReply(`current status : ${status}`);
        break;
      case 'start-server':
        if (!checkAccess(interaction.member.roles.cache, 'start'))
          return await interaction.reply("you don't have access");
        await interaction.deferReply();
        let start = await startServer();
        await interaction.editReply(start);
        break;
      case 'stop-server':
        if (!checkAccess(interaction.member.roles.cache, 'stop'))
          return await interaction.reply("you don't have access");
        await interaction.deferReply();
        let stop = await stopServer();
        await interaction.editReply(stop);
        break;
      case 'restart-server':
        if (!checkAccess(interaction.member.roles.cache, 'restart'))
          return await interaction.reply("you don't have access");
        await interaction.deferReply();
        let restart = await restartServer();
        await interaction.editReply(restart);
        break;
      default:
        break;
    }
  } catch (error) {
    await interaction.reply('sorry but something went wrong');
    console.log(error);
  }
});