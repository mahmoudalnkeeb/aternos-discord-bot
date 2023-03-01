require('dotenv').config();
const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  ClientUser,
} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
// const startServer = require('./aternos_functions/startServer');
// const checkStatus = require('./aternos_functions/checkServerStatus');
// const stopServer = require('./aternos_functions/stopServer');
// const restartServer = require('./aternos_functions/restartServer');
// const checkAccess = require('./utils/checkAccess');
const token = process.env.BOT_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(token);
