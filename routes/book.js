const express = require("express");
const createError = require("http-errors");
const Book = require("../models/book");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    if (!user.can("listBooks")) {
      return next(createError(403));
    }
    const books = await Book.findAll({
      order: ["author", "title"],
    });
    res.render("books", {
      title: "Book list",
      books,
      user,
      currentUrl: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/details", async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    if (!user.can("viewBookDetails")) {
      return next(createError(403));
    }
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    res.render("book-details", { title: book.title, user, book });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/delete", async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    if (!user.can("deleteBook")) {
      return next(createError(403));
    }
    const bookId = req.params.id;
    const book = await Book.destroy({ where: { id: bookId } });
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    if (!user.can("editBook")) {
      return next(createError(403));
    }
    const bookId = req.params.id;
    const book = await Book.findByPk(bookId);
    res.render("book-form", { title: "Edit book", user, book });
  } catch (error) {
    next(error);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.redirect("/login");
    }
    if (!user.can("editBook")) {
      return next(createError(403));
    }
    const bookId = req.params.id;
    await Book.update(req.body, { where: { id: bookId } });
    res.redirect("/books");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
