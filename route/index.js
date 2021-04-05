// Main Route
const express = require("express");
const router = express.Router();
const State = require("./../models/stateModel");
const Skill = require("./../models/skillModel");
// frontend
router.get("/", async (req, res) => {
  const state = await State.findOne({}).lean();
  res.render("home", { state });
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
