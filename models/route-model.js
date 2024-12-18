const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    startPlace: { type: String, required: true },
    endPlace: { type: String, required: true },
    stopPlaces: { type: Array, required: true },
    busRouteNumber: { type: String, required: true },
    priceOne: { type: Number, required: true },
    priceTwo: { type: Number, required: true },
    priceThree: { type: Number, required: true },
  },
  { collection: "routes" }
);

module.exports = mongoose.model("Route", userSchema);
