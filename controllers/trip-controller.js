const trips = require("../models/trip-model");
const bus = require("../models/bus-model");
const route = require("../models/route-model");
const axios = require("axios");

// Create a new trip
exports.create_trip = async (req, res) => {
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
};

// Get all trips
exports.get_all_trips = async (req, res) => {
  try {
    const trips = await trips.find();

    // Fetch user details for each product
    const enrichedtrips = await Promise.all(
      trips.map(async (trip) => {
        try {
          // Fetch user details from the auth API
          const response = await axios.get(
            `https://ok2-183873252446.asia-south1.run.app/auth/${trip.routeId}`
          );
          const startPlace = response.data.startPlace;
          const endPlace = response.data.endPlace;

          // Add the username to the product object
          return {
            ...trip.toObject(),
            startPlace,
            endPlace,
          };
        } catch (error) {
          console.error(
            `Error fetching user details for userId: ${product.userId}`,
            error.message
          );
          return {
            ...trip.toObject(),
            startPlace: "Unknown", // Fallback if the API call fails
            endPlace: "Unknown",
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
