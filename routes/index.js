const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const { v4: uuidv4 } = require("uuid");

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Home page", user: req.user });
});

module.exports = router;
