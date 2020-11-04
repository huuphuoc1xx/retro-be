const router = require("express").Router();
const models = require("../models/user.model");
const utils = require("../utils/utils");
const config = require("../config/config.json");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    utils.response(res, 1, "Please input Username!");
    return;
  }
  if (!password) {
    utils.response(res, 2, "Please input Password");
    return;
  }

  const user = await models.single(username);
  if (!user||user.length===0) {
    utils.response(res, 1, "Invalid Username!");
    return;
  }

  if (bcrypt.compareSync(password, user[0].password)) {
    req.session.userId = user[0].user_id;
    req.session.authenticated = true;
    res.json({
      code: 0,
      data: {
        userId: user[0].user_id,
      },
    });
    return;
  }

  utils.response(res, 2, "Invalid password!");
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    utils.response(res, 1, "Please input Username!");
    return;
  }
  if (!password) {
    utils.response(res, 2, "Please input Password");
    return;
  }
  const hash = bcrypt.hashSync(password, config.salt);
  models
    .add(username, hash)
    .then((response) => {
      console.log(response);
      res.json({
        code: 0,
        data: {
          user_id: response.insertId,
          username,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      utils.response(res, 1, err.message);
    });
});

router.post("/logout",(req,res)=>{
  req.session.authenticated=false;
  req.session.userId=0;
  utils.response(res,0,"Logout success");
})

module.exports = router;
