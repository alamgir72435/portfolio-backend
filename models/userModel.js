const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  status: { type: Boolean, default: true },
});

const User = mongoose.model("user", schema);

module.exports = User;
