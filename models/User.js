const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");
const bcrypt = require("bcrypt");

class User extends Model {
  async validPassword(passwordToTest) {
    return bcrypt.compare(passwordToTest, this.passwordHash);
  }
}
User.init(
  {
    username: { type: DataTypes.STRING, primaryKey: true },
    passwordHash: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);

module.exports = User;
