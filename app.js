const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./Utils/ExpressError.js");

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

// Root Route

app.get("/", (req, res) => {
  res.send("Hello from StayZo Root");
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
