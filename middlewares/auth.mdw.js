const utils = require("../utils/utils");

module.exports = (req, res, next) => {
  if (req.session.authenticated !== true) {
    utils.response(res, 3, "Authenticate failed!");
    return;
  }
  next();
};
