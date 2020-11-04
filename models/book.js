const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

class Book extends Model {
  get url() {
    return `/books/${this.id}`;
  }
}

Book.init(
  {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    adminOnly: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "book",
    indexes: [
      {
        unique: true,
        fields: ["author", "title"],
      },
    ],
  }
);

module.exports = Book;
