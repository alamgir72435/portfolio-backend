const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  client: Number,
  project: Number,
  app: Number,
  website: Number,
});

const State = mongoose.model("states", schema);

module.exports = State;
