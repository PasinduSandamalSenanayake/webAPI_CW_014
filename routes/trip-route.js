const express = require("express");
const route = express.Router();
const tripController = require("../controllers/trip-controller");

// Create a new trip
route.post("/", tripController.create_trip);

// Get all trips
route.get("/", tripController.get_all_trips);

// Get a trip by id
route.get("/:id", tripController.get_trip_by_id);

// delele a trip
route.delete("/:id", tripController.delete_trip);

module.exports = route;
