const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    busType: {
      type: String,
      enum: ["AC", "Normal", "Semi-Luxury"],
      required: true,
    },
    busNumber: { type: String, required: true, unique: true },
    seatCount: { type: Number, required: true },
    seatArray: { type: Array },
  },
  { collection: "bus" }
);

module.exports = mongoose.model("Bus", userSchema);
