const express = require("express");
const createError = require("http-errors");
const Book = require("../models/book");

const router = express.Router();

router.get("/", async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    const books = await Book.findAll({
      order: ["author", "title"]
    });
    res.render("books", { title: "Book list", books, user: req.user, currentUrl: req.originalUrl });
  }
});

module.exports = router;
