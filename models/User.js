const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");
const bcrypt = require("bcrypt");

class Permission extends Model {}
Permission.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "permission" }
);

class Role extends Model {}
Role.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  { sequelize, modelName: "role" }
);

Role.belongsToMany(Permission, { through: "role_permissions" });
Permission.belongsToMany(Role, { through: "role_permissions" });

class User extends Model {
  async validPassword(passwordToTest) {
    return bcrypt.compare(passwordToTest, this.passwordHash);
  }

  can(permissionName) {
    return this.roles.some((role) => {
      return role.permissions.some((perm) => {
        return perm.name === permissionName;
      });
    });
  }
}
User.init(
  {
    username: { type: DataTypes.STRING, primaryKey: true },
    passwordHash: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

User.belongsToMany(Role, { through: "user_roles" });
Role.belongsToMany(User, { through: "user_roles" });

module.exports = { User, Role, Permission };
