const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username!"],
    trim: true,
    unique: true,
  },
  age: {
    type: Number,
    required: [true, "Please enter your age!"],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
