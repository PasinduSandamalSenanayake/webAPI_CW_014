const Bus = require("../models/bus-model");
const Booking = require("../models/book-model");
const Trip = require("../models/trip-model");
const Reservation = require("../models/reservation-model");

// Create a new booking
exports.create_booking = async (req, res) => {
  Trip.findById(req.body.tripId).then((trip) => {
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    Bus.findById(req.body.busId).then((bus) => {
      if (!bus) {
        return res.status(404).json({ message: "Bus not found" });
      }
      Reservation.findById(req.body.reservationId).then((reservation) => {
        if (!reservation) {
          return res.status(404).json({ message: "Reservation not found" });
        }
        const booking = new Booking(req.body);
        const savedBooking = booking.save();
        res
          .status(201)
          .json({
            message: "Booking created successfully",
            data: savedBooking,
          })
          .catch((error) => {
            res.status(500).json({ message: error.message });
          });
      });
    });
  });
};

// Get all bookings
exports.get_all_bookings = async (req, res) => {
  try {
    const bookingsData = await Booking.find()
      .populate({
        path: "tripId", // Populate the trip details
        select: "startTime", // Only include startTime field
      })
      .populate({
        path: "busId", // Populate the bus details
        select: "busNumber", // Only include busNumber field
      })
      .populate({
        path: "reservationId", // Populate the reservation details
        select: "seatCount", // Only include seatCount field
      });

    res.status(200).json({
      message: "All bookings",
      data: bookingsData, // Returns bookings with populated fields
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  // try {
  //   const bookings = await Booking.find();
  //   res.status(200).json({ data: bookings });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
};
