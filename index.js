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

// Middleware
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.json());

// app.engine("handlebars", exphbs());
// app.set("view engine", "handlebars");

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// static file
app.use(express.static("public"));

// frontend
app.get("/", (req, res) => {
  res.render("home");
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

app.get("/admin/skill", (req, res) => {
  res.render("admin/skill", { layout: "admin" });
});

app.get("/admin/state", (req, res) => {
  res.render("admin/state", { layout: "admin" });
});

app.get("/admin/user", (req, res) => {
  res.render("admin/user", { layout: "admin" });
});

app.get("/admin/utility", (req, res) => {
  res.render("admin/utility", { layout: "admin" });
});

app.listen(PORT, console.log(`server running on port ${PORT}`));
