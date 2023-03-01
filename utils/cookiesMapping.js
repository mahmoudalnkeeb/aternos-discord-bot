let serverId = require('../servers/testconfig.json')['server-id'];
let unMappedCookies = require('../cookies/aternos.json').cookies;

function mapCookies() {
  return unMappedCookies.map((cookie) => {
    if (cookie.name == 'ATERNOS_SERVER') cookie.value = serverId;
    return cookie;
  });
}

module.exports = mapCookies;
