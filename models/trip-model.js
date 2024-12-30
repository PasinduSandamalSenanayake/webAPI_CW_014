const mongoose = require("mongoose");
const { tripDB } = require("../database/db");

const userSchema = new mongoose.Schema(
  {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: Date, required: true },
    routeId: {
      type: String,
      ref: "Route",
      required: true,
    },
    busId: {
      type: String,
      ref: "Bus",
      required: true,
    },
    availableSeats: { type: Number, required: true },
    availableSeatArray: { type: Array },
    operatorId: { type: String, required: true },
  },
  { collection: "trip" }
);

module.exports = tripDB.model("Trip", userSchema);
