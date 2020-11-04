const express = require("express");
const cors = require("cors");
const path = require("path");

const session = require("express-session");
const config = require("./config/config.json");

const MySQLStore = require("express-mysql-session")(session);
const logger = require("morgan");
const middlewars = require("./middlewares/middleware");
require("express-async-errors");

const sessionStore = new MySQLStore(config.mysql);
const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://retro-web.herokuapp.com"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "vGnz",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
middlewars(app);
app.use((err, req, res, next) => {
  console.log(err);
  res.json({ code: err.status, data: { message: err.message } });
});

module.exports = app;
