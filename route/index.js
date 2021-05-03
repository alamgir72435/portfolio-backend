// Main Route
const express = require("express");
const router = express.Router();
const State = require("./../models/stateModel");
const Skill = require("./../models/skillModel");
const Utility = require("./../models/utilityModel");
const Project = require("./../models/projectsModel");
const path = require("path");

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

router.get("/project/get", async (req, res) => {
  const projects = await Project.find({}).lean();
  if (projects) {
    res.json(projects);
  } else {
    res.json([]);
  }
});

router.get("/login", (req, res) => {
  res.render(path.join(__dirname, "../", "views", "login.hbs"));
});

router.get("/auth", (req, res) => {
  res.render("home");
});

router.get("/authenticate", (req, res) => {
  res.send("123");
});

module.exports = router;
