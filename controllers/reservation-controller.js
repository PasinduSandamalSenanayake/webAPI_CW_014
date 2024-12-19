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
      reservation.map(async (reservation) => {
        try {
          // route details
          const routeResponse = await axios.get(
            `https://webapi-cw-014-183873252446.asia-south1.run.app/routes/${reservation.routeId}`
          );
          const routeNumber = routeResponse.data.route.busRouteNumber;
          const startPlace = routeResponse.data.route.startPlace;
          const endPlace = routeResponse.data.route.endPlace;

          // bus details
          const busResponse = await axios.get(
            `https://webapi-cw-014-183873252446.asia-south1.run.app/buses/${reservation.busId}`
          );
          const busNumber = busResponse.data.data.busNumber;
          const seatCount = busResponse.data.data.seatCount;

          // trip details
          const tripResponse = await axios.get(
            `https://webapi-cw-014-183873252446.asia-south1.run.app/trips/${reservation.tripId}`
          );
          const startTime = tripResponse.data.data.startTime;

          return {
            ...reservation.toObject(),
            routeNumber,
            startPlace,
            endPlace,
            busNumber,
            seatCount,
            startTime,
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
            startTime: "Unknown",
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
    const reservationId = req.params.id; // Assuming the reservation ID is passed as a URL parameter
    const reservation = await Reservations.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found",
      });
    }

    try {
      // Route details
      const routeResponse = await axios.get(
        `https://webapi-cw-014-183873252446.asia-south1.run.app/routes/${reservation.routeId}`
      );
      const routeNumber = routeResponse.data.route.busRouteNumber;
      const startPlace = routeResponse.data.route.startPlace;
      const endPlace = routeResponse.data.route.endPlace;

      // Bus details
      const busResponse = await axios.get(
        `https://webapi-cw-014-183873252446.asia-south1.run.app/buses/${reservation.busId}`
      );
      const busNumber = busResponse.data.data.busNumber;
      const seatCount = busResponse.data.data.seatCount;

      // Trip details
      const tripResponse = await axios.get(
        `https://webapi-cw-014-183873252446.asia-south1.run.app/trips/${reservation.tripId}`
      );
      const startTime = tripResponse.data.data.startTime;

      // Combine all details
      const enrichedReservation = {
        ...reservation.toObject(),
        routeNumber,
        startPlace,
        endPlace,
        busNumber,
        seatCount,
        startTime,
      };

      res.status(200).json({
        message: "Success",
        data: enrichedReservation,
      });
    } catch (error) {
      console.error(
        `Error fetching additional details for reservation ID: ${reservationId}`,
        error.message
      );

      const partialReservation = {
        ...reservation.toObject(),
        routeNumber: "Unknown",
        startPlace: "Unknown",
        endPlace: "Unknown",
        busNumber: "Unknown",
        seatCount: "Unknown",
        startTime: "Unknown",
      };

      res.status(200).json({
        message: "Partial success, some details are missing",
        data: partialReservation,
      });
    }
  } catch (err) {
    res.status(400).send(err.message);
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
