const express = require("express");

const router = express.Router();
const routeController = require("../controllers/route-controller");

// Create a new route
router.post("/", routeController.router_create_route);

// Get all routes
router.get("/", routeController.routes_get_all);

// Get a route by id
router.get("/:id", routeController.routes_get_route_by_id);

// Update a route
router.put("/:id", routeController.routes_update_route_by_id);

// Delete a route
router.delete("/:id", routeController.routes_delete_route_by_id);

module.exports = router;
