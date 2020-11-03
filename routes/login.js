const express = require("express");
const router = express.Router();
const passport = require("passport");
var session = require("express-session");

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res, next) => {
    const user = req.user;
    req.session.regenerate((err) => {
      if (!err) {
        req.login(user, (err) => {
          if (! err) {
            res.redirect("/");
          } else {
            next(err);
          }
        })
      } else {
        next(err);
      }
    });
  }
);

router.get("/logout", (req, res, next) => {
  req.logout();
  req.session.regenerate((err) => {
    if (!err) {
      res.redirect("/");
    } else {
      next(err);
    }
  });
});

module.exports = router;
