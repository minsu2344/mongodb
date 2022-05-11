const mongoose = require("mongoose");

// Define Schemes
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("User", userSchema);