const express = require("express");
const router = express.Router();
const wrapAsync = require("../Utils/wrapAsync.js");
const Listing = require("../Models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../Controllers/listings.js");

// INDEX Route
router.get("/", wrapAsync(listingController.index));

//NEW Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//SHOW Route
router.get("/:id", wrapAsync(listingController.showListing));

// CREATE Route
router.post(
  "/",
  validateListing,
  isLoggedIn,
  wrapAsync(listingController.createListing)
);

//EDIT Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//UPDATE Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.updateListing)
);

//DELETE Route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
