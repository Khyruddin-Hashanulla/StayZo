const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");

const Listing = require("./Models/listing.js");
const wrapAsync = require("./Utils/wrapAsync.js");
const ExpressError = require("./Utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const Review = require("./Models/review.js");

// Connect to DB

const MONGO_URL = "mongodb://127.0.0.1:27017/StayZo";
main()
  .then(() => {
    console.log("Connected to DB..");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// Set EJS view engine and views folder

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/Public")));

// Root Route

app.get("/", (req, res) => {
  res.send("Hello from StayZo Root");
});

//Middleware Function

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(","); //Error through this line may be
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(","); //Error through this line may be
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// INDEX Route

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);

//NEW Route

app.get(
  "/listings/new",
  wrapAsync((req, res) => {
    res.render("listings/new.ejs");
  })
);

//SHOW Route

app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

// CREATE Route

app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

//EDIT Route

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

//UPDATE Route

app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  })
);

//DELETE Route

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    res.redirect("/listings");
  })
);

// REVIEWS Route(POST)

app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  })
);

// DELETE REVIEWS Route

app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
  })
);

// RANDOM Route (Page not found)

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// ERROR Handling

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// Start server

app.listen(8080, () => {
  console.log("Server is listening to port 8080...");
});
