// Admin  Route
// Main Route
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// Models
const State = require("./../models/stateModel");
const Skill = require("./../models/skillModel");
const Message = require("./../models/messageModel");
const Utility = require("./../models/utilityModel");
const Project = require("./../models/projectsModel");
const User = require("./../models/userModel");
// admin panel

// Protection

const isAuthenticated = (req, res, next) => {
  if (req.session.isAuth) {
    return next();
  }
  res.redirect("/admin/login");
};

const checkAlreadyLoginInOrNot = (req, res, next) => {
  if (req.session.isAuth) {
    return res.redirect("/admin");
  }

  next();
};

router.get("/", isAuthenticated, (req, res) => {
  res.render("admin/home", { layout: "admin" });
});

router.get("/message", isAuthenticated, async (req, res) => {
  const response = await Message.find({}).lean();
  const messages = [];
  response.forEach((message, index) => {
    let serial = index + 1;
    messages.push({ ...message, serial });
  });
  res.render("admin/message", { layout: "admin", messages });
});

router.get("/message/delete/:id", isAuthenticated, async (req, res) => {
  const removed = await Message.findByIdAndRemove(req.params.id);
  if (removed) {
    res.redirect("/admin/message");
  } else {
    res.redirect("/admin/message");
  }
});

router.get("/project", isAuthenticated, async (req, res) => {
  const projects = await Project.find().lean();
  res.render("admin/project", { layout: "admin", projects });
});

router.get("/project/edit/:id", isAuthenticated, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    res.render("admin/project-edit", { layout: "admin", project });
  } catch (error) {
    res.send("<h1>Server Error</h1>");
  }
});

router.get("/skill", isAuthenticated, async (req, res) => {
  const skillsArray = await Skill.find({}).lean();
  const skills = [];
  skillsArray.forEach((skill, index) => {
    let serial = index + 1;
    skills.push({ ...skill, serial });
  });
  res.render("admin/skill", { layout: "admin", skills });
});

router.get("/state", isAuthenticated, async (req, res) => {
  const state = await State.findOne({}).lean();
  res.render("admin/state", { layout: "admin", state });
});

router.get("/utility", isAuthenticated, async (req, res) => {
  const utility = await Utility.findOne().lean();
  console.log(utility);
  res.render("admin/utility", { layout: "admin", utility });
});

// State Option
router.post("/state", isAuthenticated, async (req, res) => {
  const { client, project, router, website } = req.body;
  if (client == "" || project == "" || router == "" || website == "") {
    req.flash("error", "Please fill out all the Field");
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
      req.flash("success", "State updated successfully !");
      res.redirect("/admin/state");
    } else {
      // something went wrong
      req.flash("error", "State Not Updated");
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
      req.flash("success", "State Created successfully !");
      res.redirect("/admin/state");
    } else {
      // error message
      req.flash("error", "State not created !");
      res.redirect("/admin/state");
    }
  }
});

// skill add
router.post("/skill", isAuthenticated, async (req, res) => {
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
router.get("/skill/del/:id", isAuthenticated, async (req, res) => {
  // console.log(req.params.id);
  const removed = await Skill.findOneAndRemove(req.params.id);
  if (removed) {
    res.redirect("/admin/skill");
  } else {
    res.redirect("/admin/skill");
  }
});

// Receive Message
router.post("/message", isAuthenticated, async (req, res) => {
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

router.post("/banner-logo", isAuthenticated, async (req, res) => {
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

router.post("/utility", isAuthenticated, async (req, res) => {
  const {
    fullName,
    designation,
    description,
    facebook,
    twitter,
    instagram,
    youtube,
  } = req.body;

  const utility = await Utility.findOne();

  if (utility) {
    // update
    utility.fullName = fullName;
    utility.designation = designation;
    utility.description = description;
    utility.facebook = facebook;
    utility.twitter = twitter;
    utility.instagram = instagram;
    utility.youtube = youtube;

    const updated = await utility.save();

    if (updated) {
      res.redirect("/admin/utility");
    } else {
      res.redirect("/admin/utility");
    }
  } else {
    // insert
    const newUtility = new Utility({
      logo: "",
      aboutPhoto: "",
      fullName,
      designation,
      description,
      facebook,
      twitter,
      instagram,
      youtube,
    });

    const created = await newUtility.save();
    if (created) {
      res.redirect("/admin/utility");
    } else {
      res.redirect("/admin/utility");
    }
  }
});

router.post("/project", isAuthenticated, async (req, res) => {
  const { projectName, projectDesc, link, thumbnail } = req.body;

  if (
    projectName === "" ||
    projectDesc === "" ||
    link === "" ||
    thumbnail === ""
  ) {
    return res.redirect("/admin/project");
  }

  // insert
  const newProject = new Project({
    projectName,
    projectDesc,
    link,
    thumbnail,
  });

  const created = await newProject.save();
  if (created) {
    console.log("Project Created");
    res.redirect("/admin/project");
  } else {
    res.redirect("/admin/project");
  }
});

router.post("/project/update", isAuthenticated, async (req, res) => {
  const { projectName, projectDesc, link, thumbnail, id } = req.body;
  const udpated = await Project.findByIdAndUpdate(
    id,
    {
      projectName,
      projectDesc,
      link,
      thumbnail,
    },
    {
      new: true,
    }
  );
  if (udpated) {
    res.redirect("/admin/project");
  } else {
    res.redirect("/admin/project");
  }
});

router.get("/project/delete/:id", isAuthenticated, async (req, res) => {
  const deleted = await Project.findByIdAndRemove(req.params.id);
  if (deleted) {
    res.redirect("/admin/project");
  } else {
    res.redirect("/admin/project");
  }
});

router.get("/login", checkAlreadyLoginInOrNot, (req, res) => [
  res.render("login"),
]);

// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (name == "" || email == "" || password == "") {
//       return res.json({
//         success: false,
//         message: "Please fill out all the field",
//       });
//     }

//     // check Existing User
//     const user = await User.findOne({ email });

//     if (user) {
//       return res.json({
//         success: false,
//         message: "Email Already Exist !",
//       });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const Newuser = await new User({
//       name,
//       email,
//       password: hash,
//     }).save();

//     if (Newuser) {
//       res.json({ success: true, message: "user created" });
//     } else {
//       res.json({ success: false, message: "user not created" });
//     }
//   } catch (error) {
//     res.json({ success: false, message: error });
//   }
// });

// Login
router.post("/login", async (req, res) => {
  // Authencitaction
  const { email, password } = req.body;

  if (email == "" || password == "") {
    req.flash("error", "Please fill all the field");
    return res.redirect("/admin/login");
  }

  // check user by email
  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "User not Found");
    return res.redirect("/admin/login");
  }

  if (user && (await bcrypt.compare(password, user.password))) {
    // success
    // use session to authenticate user
    req.session.isAuth = true;

    res.redirect("/admin");
  } else {
    req.flash("error", "Password Not matched !");
    return res.redirect("/admin/login");
  }
});

router.get("/logout", (req, res) => {
  // Logout
  req.session.destroy();
  res.redirect("/admin/login");
});

module.exports = router;
