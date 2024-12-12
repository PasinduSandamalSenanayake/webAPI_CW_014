const Reservation = require("../models/reservation-model");
const Bus = require("../models/bus-model");
const Route = require("../models/route-model");
const Trip = require("../models/trip-model");

exports.createReservation = async (req, res) => {
  try {
    const bus = await Bus.findById(req.body.busId);
    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const route = await Route.findById(req.body.routeId);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    const trip = await Trip.findById(req.body.tripId);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const newReservation = new Reservation(req.body);
    const savedReservation = await newReservation.save();
    res.status(201).json({
      message: "Reservation created successfully",
      data: savedReservation,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const reservationData = await Reservation.find()
      .populate({
        path: "busId", // Populate the bus details
        select: "busNumber", // Only include busNumber field
      })
      .populate({
        path: "routeId", // Populate the route details
        select: "startPlace",
      })
      .populate({
        path: "tripId", // Populate the trip details
        select: "startTime",
      });

    res.status(200).json({
      message: "All reservations",
      data: reservationData, // Returns reservations with populated fields
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  //   try {
  //     const reservations = await Reservation.find();
  //     res.status(200).json({ data: reservations });
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
};
