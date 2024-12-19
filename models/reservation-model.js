const mongoose = require("mongoose");
const { reservationDB } = require("../database/db");

const userSchema = new mongoose.Schema(
  {
    destinationTo: { type: String, required: true }, // Should match "reservationTo"
    destinationFrom: { type: String, required: true }, // Should match "reservationFrom"
    seatCount: { type: Number, required: true, default: 1 },
    selectSeats: { type: Array, required: true },
    routeId: {
      type: String,
      required: true,
    },
    busId: {
      type: String,
      required: true,
    },
    tripId: {
      type: String,
      required: true,
    },
    price: { type: Number },
  },
  { collection: "reservation" }
);

module.exports = reservationDB.model("Reservation", userSchema);
