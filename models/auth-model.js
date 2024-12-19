const mongoose = require("mongoose");
const { userDB } = require("../database/db");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    nic: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "operator", "commuter"],
      required: true,
    },
  },
  { collection: "user" }
);

module.exports = userDB.model("User", userSchema);
