const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 5000;
const _db_connection = require("./config/connection");
// Database Connection
_db_connection();

// Models
const State = require("./models/stateModel");
const Skill = require("./models/skillModel");

// Middleware
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.engine("handlebars", exphbs());
// app.set("view engine", "handlebars");

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// static file
app.use(express.static("public"));

// frontend
app.get("/", async (req, res) => {
  const state = await State.findOne({}).lean();
  res.render("home", { state });
});

// admin panel
app.get("/admin", (req, res) => {
  res.render("admin/home", { layout: "admin" });
});

app.get("/admin/contact", (req, res) => {
  res.render("admin/contact", { layout: "admin" });
});

app.get("/admin/project", (req, res) => {
  res.render("admin/project", { layout: "admin" });
});

app.get("/admin/skill", async (req, res) => {
  const skillsArray = await Skill.find({}).lean();
  const skills = [];
  skillsArray.forEach((skill, index) => {
    let serial = index + 1;
    skills.push({ ...skill, serial });
  });
  res.render("admin/skill", { layout: "admin", skills });
});

app.get("/admin/state", async (req, res) => {
  const state = await State.findOne({}).lean();
  res.render("admin/state", { layout: "admin", state });
});

app.get("/admin/user", (req, res) => {
  res.render("admin/user", { layout: "admin" });
});

app.get("/admin/utility", (req, res) => {
  res.render("admin/utility", { layout: "admin" });
});

// State Option
app.post("/state", async (req, res) => {
  const { client, project, app, website } = req.body;
  if (client == "" || project == "" || app == "" || website == "") {
    return res.redirect("/admin/state");
  }
  // do some work
  const state = await State.findOne({});

  if (state) {
    // if found then update
    state.client = client;
    state.project = project;
    state.app = app;
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
      app,
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

// state section end
app.post("/skill", async (req, res) => {
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

app.listen(PORT, console.log(`server running on port ${PORT}`));
