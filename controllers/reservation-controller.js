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
    // price,
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

  const routeResponse = await axios.get(
    `https://webapi-cw-014-183873252446.asia-south1.run.app/routes/${routeId}`
  );
  const startPlace = routeResponse.data.route.startPlace;
  const endPlace = routeResponse.data.route.endPlace;
  const stopPlace = routeResponse.data.route.stopPlaces[0];
  const price1 = routeResponse.data.route.priceOne;
  const price2 = routeResponse.data.route.priceTwo;
  const price3 = routeResponse.data.route.priceThree;
  // if (!stopPlace) {
  //   stopPlace == null;
  //   price2 == 0;
  //   price3 == 0;
  // }
  let price = 0;

  // Calculate the price based on the route and destination
  if (startPlace === destinationTo && endPlace === destinationFrom) {
    price = price1 * seatCount;
  } else if (startPlace === destinationTo && stopPlace === destinationFrom) {
    price = price2 * seatCount;
  } else if (stopPlace === destinationTo && endPlace === destinationFrom) {
    price = price3 * seatCount;
  }
  console.log(price1, price2, price3);
  console.log(startPlace, endPlace, stopPlace);
  console.log(destinationTo, destinationFrom);
  console.log(price);

  try {
    const seatUpdateResponse = await axios.put(
      `https://webapi-cw-014-183873252446.asia-south1.run.app/trips/${tripId}/bookedSeats`,
      { selectSeats }
    );
    if (seatUpdateResponse.status === 200) {
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
      res.status(201).json({
        message: "Reservation created successfully",
        data: reservation,
      });
    } else {
      // Handle unexpected responses from seat update
      return res.status(400).json({
        error: "Failed to update seats. Product creation aborted.",
      });
    }
    // Attempt to create and save the bus
  } catch (err) {
    if (err.response && err.response.data) {
      // Return error message from external service or validation
      return res.status(err.response.status).json({
        error: err.response.data.error,
        errorCode: err.response.status,
      });
    }
    // Handle general errors
    return res.status(500).json({ error: "Internal Server Error" });
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
          const busSeatCount = busResponse.data.data.seatCount;

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
            busSeatCount,
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
            busSeatCount: "Unknown",
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
