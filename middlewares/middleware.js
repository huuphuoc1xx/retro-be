const boardRoute = require("../routes/board.route");
const cardRoute = require("../routes/card.route");
const loginRoute = require("../routes/login.route");
const utils = require("../utils/utils");
const authMdw = require("./auth.mdw");

module.exports = (app) => {
  app.use("/", loginRoute);
  app.get("/", authMdw, (req, res) => {
    utils.response(res, 0, "Authenticated success");
  });
  app.use("/board", authMdw, boardRoute);
  app.use("/card", authMdw, cardRoute);
};
