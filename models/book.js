const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db.js");

class Book extends Model {}

Book.init(
  {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
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

(async () => {
  await Book.sync();
  await Book.bulkCreate([
    {
      title: "Harry Potter à l'école des sorciers",
      author: "J. K. Rowling",
    },
    {
      title: "Harry Potter et la chambre des secrets",
      author: "J. K. Rowling",
    },
    {
      title: "Harry Potter et l'ordre du phoenix",
      author: "J. K. Rowling",
    },
    {
      title: "Harry Potter et les reliques de la mort",
      author: "J. K. Rowling",
    },
    {
      title: "Harry Potter et le prisonier d'Azkaban",
      author: "J. K. Rowling",
    },
    {
      title: "Harry Potter et la coupe de faut",
      author: "J. K. Rowling",
    },
    {
      title: "Harry Potter et le prince de Sang-Mêlé",
      author: "J. K. Rowling",
    },
    {
      title: "Le Sorceleur T.1: le dernier voeu",
      author: "Andrzej Sapkowski",
    },
    {
      title: "Le Sorceleur T.2: l'épée de la providence",
      author: "Andrzej Sapkowski",
    },
    {
      title: "Le Sorceleur T.3: le sang des elfes",
      author: "Andrzej Sapkowski",
    },
    {
      title: "Le Sorceleur T.4: le temps du mépris",
      author: "Andrzej Sapkowski",
    },
    {
      title: "Le Sorceleur T.5: le baptême du feu",
      author: "Andrzej Sapkowski",
    },
    {
      title: "Le Sorceleur T.6: la dame du lac",
      author: "Andrzej Sapkowski",
    },
    {
      title: "Le Sorceleur T.7: la tour de l'hirondelle",
      author: "Andrzej Sapkowski",
    },
  ]);
})();

module.exports = Book;
