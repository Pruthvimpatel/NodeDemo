const { roles } = require("./role");

class Permissions {
constructor() {
    this.Permissions = [];
}

getPermissionsByRoleName(roleName) {
    const role = roles.roles.find((r) => r.name == roleName);
    return role ? role.Permissions: [];
}
}

module.exports = Permissions;