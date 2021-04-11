const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: Boolean, default: true },
});

const User = mongoose.model("user", schema);

module.exports = User;
