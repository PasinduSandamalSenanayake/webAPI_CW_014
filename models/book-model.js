const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reservation",
      required: true,
    },
    bookedSeats: { type: Number, required: true },
    bookedSeatArray: { type: Array },
  },
  { collection: "booking" }
);

module.exports = mongoose.model("Booking", userSchema);
