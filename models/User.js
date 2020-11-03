const { Model, DataTypes } = require("sequelize");
const debug = require("debug")("authenticaiton-example:user");
const bcrypt = require("bcrypt");
const sequelize = require("./db.js");

const saltRounds = 10;

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

(async () => {
  await User.sync();
  const adminPasswordHash = await bcrypt.hash("My admin password", saltRounds);
  const otherUserPasswordHash = await bcrypt.hash(
    "My other user password",
    saltRounds
  );
  await User.bulkCreate([
    {
      username: "admin",
      passwordHash: adminPasswordHash,
    },
    {
      username: "otherUser",
      passwordHash: otherUserPasswordHash,
    },
  ]);
})();

module.exports = User;
