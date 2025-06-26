const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");

// FOR SIGNUP

router.get("/signup", (req, res) => {
  res.render("Users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to StayZo!");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  })
);

// FOR LOGIN

router.get("/login", (req, res) => {
  res.render("Users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome back to StayZo! ");
    res.redirect("/listings");
  }
);

module.exports = router;
