const mongoose = require("mongoose");
const { reservationDB } = require("../database/db");

const userSchema = new mongoose.Schema(
  {
    destinationTo: { type: String, required: true }, // Should match "reservationTo"
    destinationFrom: { type: String, required: true }, // Should match "reservationFrom"
    seatCount: { type: Number, required: true, default: 1 },
    selectSeats: { type: Array, required: true },
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
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
  },
  { collection: "reservation" }
);

module.exports = reservationDB.model("Reservation", userSchema);
