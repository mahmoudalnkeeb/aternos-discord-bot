let serverId = require('../servers/configTemplate.json')['server-id'];
let unMappedCookies = require('../cookies/aternos.json').cookies;

function mapCookies() {
  return unMappedCookies.map((cookie) => {
    if (cookie.name == 'ATERNOS_SERVER') cookie.value = serverId;
  });
}

module.exports = mapCookies;
