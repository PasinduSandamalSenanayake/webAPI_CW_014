const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userController = require("../controllers/auth-controller");

// User Registration
router.post("/register", userController.user_register);

// User Login
router.post("/login", userController.user_login);

// Delete a user
router.delete("/users/:id", userController.delete_user);

// update a user
router.patch("/users/:id", userController.update_user);

// Get all admins
router.get("/users/admins", userController.get_all_admins);

// Get all operators
router.get("/users/operators", userController.get_all_operators);

// Get all commuters
router.get("/users/commuters", userController.get_all_commuters);

module.exports = router;
