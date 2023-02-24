const { rolesConfig } = require('../configs/config');
const roles = rolesConfig.roles;

const checkAccess = (userRoles, func) => {
  let rolesHasAccess = roles.filter((role) => role.functions.includes(func));
  return userRoles.some((role) =>
    rolesHasAccess.map((role) => role.role).includes(role.name)
  );
};

module.exports = checkAccess;
