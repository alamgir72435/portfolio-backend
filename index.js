const express = require("express");
const cors = require("cors");
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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");
// static file
app.use(express.static("public"));

// Route Handle
app.use("/", require("./route"));
app.use("/admin", require("./route/admin"));

app.listen(PORT, console.log(`server running on port ${PORT}`));