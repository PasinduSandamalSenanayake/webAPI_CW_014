const mongoose = require("mongoose");
const { bookingDB } = require("../database/db");

const userSchema = new mongoose.Schema(
  {
    tripId: {
      type: String,
      required: true,
    },
    busId: {
      type: String,
      required: true,
    },
    reservationId: {
      type: String,
      required: true,
    },
    confirm: { type: String, required: true },
  },
  { collection: "booking" }
);

module.exports = bookingDB.model("Booking", userSchema);
