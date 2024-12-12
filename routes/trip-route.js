const express = require("express");
const route = express.Router();
const tripController = require("../controllers/trip-controller");

// Create a new trip
route.post("/", tripController.create_trip);

// Get all trips
route.get("/", tripController.get_all_trips);

module.exports = route;
