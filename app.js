const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./Utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const listings = require("./Routes/listing.js");
const reviews = require("./Routes/review.js");

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

//EXPRESS SESSION

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  Cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Root Route

app.get("/", (req, res) => {
  res.send("Hello from StayZo Root");
});

//FLASH

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//FOR ROUTERS
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

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
