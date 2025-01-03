const User = require("../models/auth-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Registration
exports.user_register = (req, res, next) => {
  const { firstName, lastName, age, email, password, mobile, nic, role } =
    req.body;

  User.find({ email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        // If a user with the email already exists
        return res.status(409).json({
          message: "Email already exists",
        });
      } else {
        // Hash the password
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
              console: err,
            });
          } else {
            // Create a new user
            const newUser = new User({
              firstName,
              lastName,
              age,
              email,
              password: hash,
              mobile,
              nic,
              role,
            });

            // Save the user to the database
            newUser
              .save()
              .then((result) => {
                res.status(201).json({
                  message: "User created successfully",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err.message,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err.message,
      });
    });
};

// User Login
exports.user_login = async (req, res) => {
  const { email, password, role } = req.body;

  // Check if all required fields are provided
  if (!email || !password || !role) {
    return res.status(400).send("Email, password, and role are required");
  }

  // Find the user by email
  const user = await User.findOne({ email, role });
  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  // Validate the password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid credentials");
  }

  // Generate a JWT token
  const token = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  // Send the token in the response header
  res
    .header("authentication", token)
    .send({ message: "Login successful", token });
};

// Delete a user
exports.delete_user = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a user
exports.update_user = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all admins
exports.get_all_admins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    if (admins.length === 0) {
      return res.status(404).json({ message: "No admins found" });
    }

    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all operators
exports.get_all_operators = async (req, res) => {
  try {
    const operators = await User.find({ role: "operator" });

    if (operators.length === 0) {
      return res.status(404).json({ message: "No operators found" });
    }

    res.status(200).json(operators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all commuters
exports.get_all_commuters = async (req, res) => {
  try {
    const commuters = await User.find({ role: "commuter" });

    if (commuters.length === 0) {
      return res.status(404).json({ message: "No commuters found" });
    }

    res.status(200).json(commuters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
