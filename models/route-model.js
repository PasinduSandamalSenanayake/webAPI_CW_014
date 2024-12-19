const mongoose = require("mongoose");
const { routeDB } = require("../database/db");

const userSchema = new mongoose.Schema(
  {
    startPlace: { type: String, required: true },
    endPlace: { type: String, required: true },
    stopPlaces: { type: Array },
    busRouteNumber: { type: String, required: true },
    priceOne: { type: Number, required: true },
    priceTwo: { type: Number },
    priceThree: { type: Number },
  },
  { collection: "routes" }
);

module.exports = routeDB.model("Route", userSchema);
