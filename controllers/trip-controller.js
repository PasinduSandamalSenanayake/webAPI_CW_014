const Trips = require("../models/trip-model");
const bus = require("../models/bus-model");
const route = require("../models/route-model");
const axios = require("axios");

// Create a new trip
exports.create_trip = async (req, res) => {
  const { startTime, endTime, date, routeId, busId, availableSeats } = req.body;

  // Validate required fields
  if (
    !startTime ||
    !endTime ||
    !date ||
    !routeId ||
    !busId ||
    !availableSeats
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Generate seatArray from 1 to seatCount
    const availableSeatArray = Array.from(
      { length: availableSeats },
      (_, i) => i + 1
    );

    // Attempt to create and save the bus
    const trip = new Trips({
      startTime,
      endTime,
      date,
      routeId,
      busId,
      availableSeats,
      availableSeatArray,
    });
    await trip.save();
    res.status(201).json({ message: "Trip created successfully", data: trip });
  } catch (error) {
    // Handle other errors
    res.status(500).json({ message: error.message });
  }
};

// Get all trips
exports.get_all_trips = async (req, res) => {
  try {
    const trips = await Trips.find();

    const enrichedtrips = await Promise.all(
      trips.map(async (trip) => {
        try {
          // route details
          const routeResponse = await axios.get(
            `https://webapi-cw-014-183873252446.asia-south1.run.app/routes/${trip.routeId}`
          );
          const startPlace = routeResponse.data.route.startPlace;
          const endPlace = routeResponse.data.route.endPlace;

          // bus details
          const busResponse = await axios.get(
            `https://webapi-cw-014-183873252446.asia-south1.run.app/buses/${trip.busId}`
          );
          const busNumber = busResponse.data.data.busNumber;
          const seatCount = busResponse.data.data.seatCount;

          return {
            ...trip.toObject(),
            startPlace,
            endPlace,
            busNumber,
            seatCount,
          };
        } catch (error) {
          console.error(
            `Error fetching user details for routeId: ${trip.routeId}`,
            error.message
          );
          return {
            ...trip.toObject(),
            startPlace: "Unknown",
            endPlace: "Unknown",
            busNumber: "Unknown",
            seatCount: "Unknown",
          };
        }
      })
    );

    res.status(200).json({
      message: "Success",
      data: enrichedtrips,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Get a trip by id
exports.get_trip_by_id = async (req, res) => {
  try {
    const trip = await Trips.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json({ data: trip });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a trip
exports.delete_trip = async (req, res) => {
  try {
    const trip = await Trips.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
