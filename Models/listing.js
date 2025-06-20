const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  // image: {
  //   url: {
  //     type: String,
  //     set: (v) =>
  //       v === ""
  //         ? "https://unsplash.com/photos/a-rainbow-arches-over-a-majestic-mountain-landscape-vwFvhJf6u_I"
  //         : v,
  //   },
  // },
  image: {
    filename: String,
    url: {
      type: String,
      required: true,
      default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

//  image: {
//     type: String,
//     set: (v) =>
//       v === ""
//         ? "https://unsplash.com/photos/a-rainbow-arches-over-a-majestic-mountain-landscape-vwFvhJf6u_I"
//         : v,
//   },
