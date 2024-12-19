const Reservations = require("../models/reservation-model");
const Bus = require("../models/bus-model");
const Route = require("../models/route-model");
const Trip = require("../models/trip-model");
const axios = require("axios");

exports.createReservation = async (req, res) => {
  const {
    destinationTo,
    destinationFrom,
    seatCount,
    selectSeats,
    routeId,
    busId,
    tripId,
    price,
  } = req.body;

  // Validate required fields
  if (
    !destinationTo ||
    !destinationFrom ||
    !seatCount ||
    !selectSeats ||
    !routeId ||
    !busId ||
    !tripId
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Attempt to create and save the bus
    const reservation = new Reservations({
      destinationTo,
      destinationFrom,
      seatCount,
      selectSeats,
      routeId,
      busId,
      tripId,
      price,
    });
    await reservation.save();
    res
      .status(201)
      .json({ message: "Reservation created successfully", data: reservation });
  } catch (error) {
    // Handle other errors
    res.status(500).json({ message: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservation = await Reservations.find();

    const enrichedReservations = await Promise.all(
      reservation.map(async (trip) => {
        try {
          // route details
          const routeResponse = await axios.get(
            `https://webapi-cw-014-183873252446.asia-south1.run.app/routes/${trip.routeId}`
          );
          const routeNumber = routeResponse.data.route.busRouteNumber;
          const startPlace = routeResponse.data.route.startPlace;
          const endPlace = routeResponse.data.route.endPlace;

          // bus details
          const busResponse = await axios.get(
            `https://webapi-cw-014-183873252446.asia-south1.run.app/buses/${trip.busId}`
          );
          const busNumber = busResponse.data.data.busNumber;
          const seatCount = busResponse.data.data.seatCount;

          return {
            ...reservation.toObject(),
            routeNumber,
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
            ...reservation.toObject(),
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
      data: enrichedReservations,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Get a reservation by id
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservations.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ data: reservation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const deletedReservation = await Reservations.findByIdAndDelete(
      req.params.id
    );
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
