const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const logger = require("morgan");
const middlewars = require("./middlewares/middleware");
require("express-async-errors");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "same-origin"],
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "0" }));
middlewars(app);
app.use((err, req, res, next) => {
  console.log(err);
  res.json({ code: err.status, data: { message: err.message } });
});

module.exports = app;
