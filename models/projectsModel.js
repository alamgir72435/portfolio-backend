const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  thumbnail: { type: String },
  projectName: { type: String },
  projectDesc: { type: String },
  link: { type: String },
});

const Project = mongoose.model("projects", schema);
module.exports = Project;
