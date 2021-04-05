// Admin  Route
// Main Route
const express = require("express");
const router = express.Router();
// Models
const State = require("./../models/stateModel");
const Skill = require("./../models/skillModel");
const Message = require("./../models/messageModel");
const Utility = require("./../models/utilityModel");

// admin panel
router.get("/", (req, res) => {
  res.render("admin/home", { layout: "admin" });
});

router.get("/message", async (req, res) => {
  const response = await Message.find({}).lean();
  const messages = [];
  response.forEach((message, index) => {
    let serial = index + 1;
    messages.push({ ...message, serial });
  });
  res.render("admin/message", { layout: "admin", messages });
});

router.get("/message/delete/:id", async (req, res) => {
  const removed = await Message.findByIdAndRemove(req.params.id);
  if (removed) {
    res.redirect("/admin/message");
  } else {
    res.redirect("/admin/message");
  }
});

router.get("/project", (req, res) => {
  res.render("admin/project", { layout: "admin" });
});

router.get("/skill", async (req, res) => {
  const skillsArray = await Skill.find({}).lean();
  const skills = [];
  skillsArray.forEach((skill, index) => {
    let serial = index + 1;
    skills.push({ ...skill, serial });
  });
  res.render("admin/skill", { layout: "admin", skills });
});

router.get("/state", async (req, res) => {
  const state = await State.findOne({}).lean();
  res.render("admin/state", { layout: "admin", state });
});

router.get("/user", (req, res) => {
  res.render("admin/user", { layout: "admin" });
});

router.get("/utility", async (req, res) => {
  const utility = await Utility.findOne().lean();
  res.render("admin/utility", { layout: "admin", utility });
});

// State Option
router.post("/state", async (req, res) => {
  const { client, project, router, website } = req.body;
  if (client == "" || project == "" || router == "" || website == "") {
    return res.redirect("/admin/state");
  }
  // do some work
  const state = await State.findOne({});

  if (state) {
    // if found then update
    state.client = client;
    state.project = project;
    state.router = router;
    state.website = website;
    const update = await state.save();
    if (update) {
      // update
      res.redirect("/admin/state");
    } else {
      // something went wrong
      res.redirect("/admin/state");
    }
  } else {
    // if not found then create new data
    const created = new State({
      client,
      project,
      router,
      website,
    }).save();

    if (created) {
      // success message
      res.redirect("/admin/state");
    } else {
      // error message
      res.redirect("/admin/state");
    }
  }
});

// skill add
router.post("/skill", async (req, res) => {
  const { name, percent, desc } = req.body;
  if (name == "" || percent == "" || desc == "") {
    return res.redirect("/admin/skill");
  }
  // if everything ok then  add data
  const created = await new Skill({
    name,
    percent,
    desc,
  }).save();

  if (created) {
    // with success message
    res.redirect("/admin/skill");
  } else {
    // with error message
    res.redirect("/admin/skill");
  }
});

//  skill delete by id
router.get("/skill/del/:id", async (req, res) => {
  // console.log(req.params.id);
  const removed = await Skill.findOneAndRemove(req.params.id);
  if (removed) {
    res.redirect("/admin/skill");
  } else {
    res.redirect("/admin/skill");
  }
});

// Receive Message
router.post("/message", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const newMessage = new Message({
    name,
    email,
    subject,
    message,
  });

  const created = await newMessage.save();

  if (created) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

router.post("/banner-logo", async (req, res) => {
  const { bannerImgInput, logoImgInput } = req.body;

  const utility = await Utility.findOne();

  if (utility) {
    // update
    utility.logo = logoImgInput;
    utility.aboutPhoto = bannerImgInput;
    const updated = await utility.save();
    if (updated) {
      res.redirect("/admin/utility");
    } else {
      res.redirect("/admin/utility");
    }
  } else {
    // insert
    const newUtility = new Utility({
      logo: logoImgInput,
      aboutPhoto: bannerImgInput,
      fullName: "",
      designation: "",
      description: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    });

    const created = await newUtility.save();
    if (created) {
      res.redirect("/admin/utility");
    } else {
      res.redirect("/admin/utility");
    }
  }
});

module.exports = router;
