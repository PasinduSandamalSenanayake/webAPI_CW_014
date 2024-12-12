const express = require("express");
const route = express.Router();
const bookController = require("../controllers/book-controller");

// Create a new booking
route.post("/book", bookController.create_booking);

// Get all bookings
route.get("/book", bookController.get_all_bookings);

module.exports = route;
