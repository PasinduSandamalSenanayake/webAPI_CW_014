const express = require("express");
const route = express.Router();
const reservationController = require("../controllers/reservation-controller");

// create a reservation
route.post("/", reservationController.createReservation);

// get all reservations
route.get("/", reservationController.getAllReservations);

module.exports = route;
