const { serverConfig } = require('../configs/config');

const checkAccess = (userRoles, guildId, func) => {
  const roles = serverConfig[guildId].roles;
  let rolesHasAccess = roles.filter((role) => role.functions.includes(func));
  return userRoles.some((role) =>
    rolesHasAccess.map((role) => role.role).includes(role.name)
  );
};

module.exports = checkAccess;
