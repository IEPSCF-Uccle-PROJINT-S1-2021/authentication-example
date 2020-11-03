const { Sequelize } = require("sequelize");
const debug = require("debug")("authentication-example:db");

const sequelize = new Sequelize("sqlite::memory:", {
  logging: debug,
});

module.exports = sequelize;
