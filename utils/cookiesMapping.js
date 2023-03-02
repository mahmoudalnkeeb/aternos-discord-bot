const config = require('../configs/config');
let unMappedCookies = require('../cookies/aternos.json').cookies;

function mapCookies(guildId) {
  let serverId = config.serverConfig[`${guildId}`]['server-id'];
  return unMappedCookies.map((cookie) => {
    if (cookie.name == 'ATERNOS_SERVER') cookie.value = serverId;
    return cookie;
  });
}

module.exports = mapCookies;
