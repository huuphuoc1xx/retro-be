const models = require("../models/board.model");
const router = require("express").Router();
const utils = require("../utils/utils");
router.get("/", async (req, res) => {
  const userId = req.session.userId;
  const info = await models.get(userId);
  res.json({
    code: 0,
    data: { boards: info },
  });
});

router.post("/", async (req, res) => {
  const userId = req.session.userId;
  models
    .add(req.body.name, userId)
    .then((response) => {
      console.log(response);
      utils.response(res, 0, "Add new board success!!!");
    })
    .catch((err) => {
      console.log(err);
      utils.response(res, 1, err.message);
    });
});

module.exports = router;
