const Routes = require("../models/route-model");

// Get all routes
exports.routes_get_all = async (req, res) => {
  try {
    const routes = await Routes.find();
    res.status(200).json({ routes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new route
exports.router_create_route = async (req, res) => {
  const { startPlace, endPlace, stopPlaces, busRouteNumber } = req.body;
  if (!startPlace || !endPlace || !stopPlaces || !busRouteNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const route = new Routes({
      startPlace,
      endPlace,
      stopPlaces,
      busRouteNumber,
    });
    await route.save();
    res.status(201).json({
      message: "Route created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a route by id
exports.routes_get_route_by_id = async (req, res) => {
  try {
    const route = await Routes.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    res.status(200).json({ route });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a route
exports.routes_update_route_by_id = async (req, res) => {
  try {
    const route = await Routes.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    route.startPlace = req.body.startPlace;
    route.endPlace = req.body.endPlace;
    route.stopPlaces = req.body.stopPlaces;
    route.busRouteNumber = req.body.busRouteNumber;
    await route.save();
    res.status(200).json({ message: "Route updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a route
exports.routes_delete_route_by_id = async (req, res) => {
  try {
    const route = await Routes.findById(req.params.id);
    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }
    await route.remove();
    res.status(200).json({ message: "Route deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
