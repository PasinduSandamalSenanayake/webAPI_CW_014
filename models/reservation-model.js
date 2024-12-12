const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    destinationTo: { type: String, required: true }, // Should match "reservationTo"
    destinationFrom: { type: String, required: true }, // Should match "reservationFrom"
    seatCount: { type: Number, required: true, default: 1 },
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

module.exports = mongoose.model("Reservation", userSchema);
