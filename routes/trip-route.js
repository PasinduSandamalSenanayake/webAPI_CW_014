const express = require("express");
const route = express.Router();
const tripController = require("../controllers/trip-controller");
const { authenticate, authorize } = require("../middleware/auth");

// Create a new trip
route.post(
  "/",
  authenticate,
  authorize(["operator"]),
  tripController.create_trip
);

// Get all trips
route.get(
  "/",
  // authenticate,
  // authorize(["operator"]),
  tripController.get_all_trips
);

// Get a trip by id
route.get("/:id", tripController.get_trip_by_id);

// delele a trip
route.delete("/:id", tripController.delete_trip);

route.put("/:tripId/bookedSeats", tripController.update_seats);

// Get a operator's trips
route.get(
  "/operator/:operatorId",
  authenticate,
  authorize(["operator"]),
  tripController.get_operator_trips
);

module.exports = route;
