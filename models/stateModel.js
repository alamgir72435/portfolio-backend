const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  client: {
    icon: { type: String },
    count: { type: String },
    desc: { type: String },
  },
  projects: {
    icon: { type: String },
    count: { type: String },
    desc: { type: String },
  },
  apps: {
    icon: { type: String },
    count: { type: String },
    desc: { type: String },
  },
  websites: {
    icon: { type: String },
    count: { type: String },
    desc: { type: String },
  },
});

const State = mongoose.model("state", schema);
