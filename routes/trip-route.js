const express = require("express");
const route = express.Router();
const tripController = require("../controllers/trip-controller");
const { authenticate, authorize } = require("../middleware/auth");

// Create a new trip
route.post("/", tripController.create_trip);

// Get all trips
route.get(
  "/",
  authenticate,
  authorize(["admin"]),
  tripController.get_all_trips
);

// Get a trip by id
route.get("/:id", tripController.get_trip_by_id);

// delele a trip
route.delete("/:id", tripController.delete_trip);

route.put("/:tripId/bookedSeats", tripController.update_seats);

module.exports = route;
