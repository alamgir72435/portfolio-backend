const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  projectName: { type: String },
  projectDesc: { type: String },
  link: { type: String },
  thumbnail: { type: String },
});

const Project = mongoose.model("projects", schema);
module.exports = Project;
