const express = require("express");
const router = express.Router();
const busController = require("../controllers/bus-controller");

// Create a new bus
router.post("/", busController.create_bus);

// Get all buses
router.get("/", busController.get_all_buses);

// Update a bus
router.patch("/:id", busController.update_bus);

// Delete a bus
router.delete("/:id", busController.delete_bus);

// Get all buses by AC
router.get("/AC", busController.get_all_ac_buses);

// Get all buses by Normal
router.get("/Normal", busController.get_all_normal_buses);

// Get all buses by Semi-Luxury
router.get("/Semi-Luxury", busController.get_all_semi_luxury_buses);

// Get a bus by id
router.get("/:id", busController.get_bus_by_id);

// Get all buses by type // error
router.get("/bus", busController.get_all_buses_by_type);

module.exports = router;
