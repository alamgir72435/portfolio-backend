const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const _db_connection = require("./config/connection");
// Database Connection
_db_connection();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));

// app.use((req, res, next) => {
//   console.log("i am from Middleware");
//   next();
// });

app.post("/test", (req, res) => {
  console.log(req.body);
});

app.get("/", (req, res) => {
  res.send('<h1 style="text-align:center;">Server running </h1>');
});

app.listen(PORT, console.log(`server running on port ${PORT}`));
