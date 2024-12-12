const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    startPlace: { type: String, required: true },
    endPlace: { type: String, required: true },
    stopPlaces: { type: Array, required: true },
    busRouteNumber: { type: String, required: true },
  },
  { collection: "routes1" }
);

module.exports = mongoose.model("Route", userSchema);
