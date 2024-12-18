const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: Date, required: true },
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true,
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    availableSeats: { type: Number, required: true },
    availableSeatArray: { type: Array },
  },
  { collection: "trip" }
);

module.exports = mongoose.model("Trip", userSchema);
