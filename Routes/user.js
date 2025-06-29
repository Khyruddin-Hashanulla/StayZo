const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../Controllers/users.js");

// FOR SIGNUP
router.get("/signup", userController.renderSignupForm);
router.post("/signup", wrapAsync(userController.signup));

// FOR LOGIN
router.get("/login", userController.renderLoginFrom);
router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login
);

// FOR LOG OUT
router.get("/logout", userController.logout);

module.exports = router;
