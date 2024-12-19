const express = require("express");
const route = express.Router();
const reservationController = require("../controllers/reservation-controller");

// create a reservation
route.post("/", reservationController.createReservation);

// get all reservations
route.get("/", reservationController.getAllReservations);

// get a reservation by id
route.get("/:id", reservationController.getReservationById);

// delete a reservation
route.delete("/:id", reservationController.deleteReservation);

module.exports = route;
