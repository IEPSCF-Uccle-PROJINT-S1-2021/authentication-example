const sequelize = require("./db");
const Book = require("./book");
const { User, Role, Permission } = require("./user");
const bcrypt = require("bcrypt");

const saltRounds = 10;

(async () => {
  await sequelize.sync();

  const [
    listBookPerm,
    viewBookDetailsPerm,
    editBookPerm,
    deleteBookPerm,
  ] = await Permission.bulkCreate([
    { name: "listBooks" },
    { name: "viewBookDetails" },
    { name: "editBook" },
    { name: "deleteBook" },
  ]);

  const [readerRole, librarianRole, adminRole] = await Role.bulkCreate([
    { name: "user" },
    { name: "librarian" },
    { name: "admin" },
  ]);

  await Promise.all([
    readerRole.addPermissions([listBookPerm, viewBookDetailsPerm]),
    librarianRole.addPermission([listBookPerm, viewBookDetailsPerm, editBookPerm]),
    adminRole.addPermission([listBookPerm, viewBookDetailsPerm, editBookPerm, deleteBookPerm]),
  ]);

  const arthurPasswordHash = await bcrypt.hash("Arthur password", saltRounds);
  const louisPasswordHash = await bcrypt.hash("Louis password", saltRounds);
  const ronPasswordHash = await bcrypt.hash(
    "Ron password",
    saltRounds
  );
  const [arthur, louis, ron] = await User.bulkCreate([
    {
      username: "arthur",
      passwordHash: arthurPasswordHash,
    },
    {
      username: "louis",
      passwordHash: louisPasswordHash,
    },
    {
      username: "ron",
      passwordHash: ronPasswordHash,
    },
  ]);

  await Promise.all([
    arthur.setRoles([adminRole]),
    louis.setRoles([librarianRole]),
    ron.setRoles([readerRole])
  ]);

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
      adminOnly: true,
    },
    {
      title: "Le Sorceleur T.2: l'épée de la providence",
      author: "Andrzej Sapkowski",
      adminOnly: true,
    },
    {
      title: "Le Sorceleur T.3: le sang des elfes",
      author: "Andrzej Sapkowski",
      adminOnly: true,
    },
    {
      title: "Le Sorceleur T.4: le temps du mépris",
      author: "Andrzej Sapkowski",
      adminOnly: true,
    },
    {
      title: "Le Sorceleur T.5: le baptême du feu",
      author: "Andrzej Sapkowski",
      adminOnly: true,
    },
    {
      title: "Le Sorceleur T.6: la dame du lac",
      author: "Andrzej Sapkowski",
      adminOnly: true,
    },
    {
      title: "Le Sorceleur T.7: la tour de l'hirondelle",
      author: "Andrzej Sapkowski",
      adminOnly: true,
    },
  ]);
})();
