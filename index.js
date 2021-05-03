const express = require("express");
const cors = require("cors");
const methodOverride = require("method-override");
const exphbs = require("express-handlebars");
const app = express();
const PORT = process.env.PORT || 5000;
const _db_connection = require("./config/connection");

const path = require("path");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("express-flash");
const MongoDBSession = require("connect-mongodb-session")(session);
// Database Connection
_db_connection();
const keys = require("./config/keys");

// Store Session
const store = new MongoDBSession({
  uri: keys.uri,
  collection: "user-sessions",
});

// Middleware
app.use(cors());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// app.engine(".hbs", exphbs({ extname: ".hbs" }));
// app.set("view engine", ".hbs");

// static file
app.use(express.static("public"));

// for message and auth
app.use(cookieParser("keyboard cat"));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "my-secret",
    cookie: {
      maxAge: 60000,
    },
    store,
  })
);
app.use(flash());

// Route Handle
app.use("/", require("./route"));
app.use("/admin", require("./route/admin"));

app.listen(PORT, console.log(`server running on port ${PORT}`));
