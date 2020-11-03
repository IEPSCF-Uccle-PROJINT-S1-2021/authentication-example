const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const debug = require("debug")("session-example:User");

const saltRounds = 10;

const sequelize = new Sequelize("sqlite::memory:", {
  logging: debug,
});

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
  await sequelize.sync();
  const adminPasswordHash = await bcrypt.hash("My admin password", saltRounds);
  const otherUserPasswordHash = await bcrypt.hash(
    "My other user password",
    saltRounds
  );
  await User.create({
    username: "admin",
    passwordHash: adminPasswordHash,
  });
  await User.create({
    username: "otherUser",
    passwordHash: otherUserPasswordHash,
  });
})();

module.exports = User;
