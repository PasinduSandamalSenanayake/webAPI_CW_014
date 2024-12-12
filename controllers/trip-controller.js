const trips = require("../models/trip-model");
const bus = require("../models/bus-model");
const route = require("../models/route-model");

// Create a new trip
exports.create_trip = async (req, res) => {
  bus.findById(req.body.busId).then((bus) => {
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }
    route
      .findById(req.body.routeId)
      .then((route) => {
        if (!route) {
          return res.status(404).json({ message: "Route not found" });
        }
        const trip = new trips(req.body);
        trip
          .save()
          .then((trip) => {
            res
              .status(201)
              .json({ message: "Trip created successfully", data: trip });
          })
          .catch((error) => {
            res.status(500).json({ message: error.message });
          });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  });
};

// Get all trips
exports.get_all_trips = async (req, res) => {
  try {
    const tripsData = await trips
      .find()
      .populate({
        path: "busId", // Populate the bus details
        select: "busNumber", // Only include busNumber field
      })
      .populate({
        path: "routeId", // Populate the route details
        select: "startPlace endPlace", // Only include startPlace and endPlace fields
      });

    res.status(200).json({
      message: "All trips",
      data: tripsData, // Returns trips with populated fields
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
