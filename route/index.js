// Main Route
const express = require("express");
const router = express.Router();
const State = require("./../models/stateModel");
const Skill = require("./../models/skillModel");
const Utility = require("./../models/utilityModel");
// frontend
router.get("/", async (req, res) => {
  const state = await State.findOne().lean();
  const utility = await Utility.findOne().lean();

  res.render("home", { state, utility });
});

router.get("/skill/get", async (req, res) => {
  const skillsArray = await Skill.find({}).lean();
  if (skillsArray) {
    res.json(skillsArray);
  } else {
    res.json([]);
  }
});

module.exports = router;
