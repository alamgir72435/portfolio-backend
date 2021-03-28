const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    percent: {
      type: String,
    },
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Skill = mongoose.model("skills", skillSchema);
module.exports = Skill;
