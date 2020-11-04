const router = require("express").Router();
const models = require("../models/user.model");
const utils = require("../utils/utils");

router.get("/", async (req, res) => {
  const userId = req.session.userId;
  const info = await models.loadInfo(userId);
  res.json({
    code: 0,
    data: info[0],
  });
});
router.put("/", async (req, res) => {
  const userId = req.session.userId;
  const { name, email } = req.body;
  const dob = req.body.dob && new Date(req.body.dob);
  console.log(dob)
  models
    .edit(userId, name, email, dob)
    .then((response) => {
      if (response.affectedRows) {
        res.json({
          code: 0,
          data: {
            name,
            email,
            dob,
          },
        });
        return;
      }
      utils.response(res, 1, "Something was wrong");
    })
    .catch((err) => {
      utils.response(res, 2, err.message);
    });
});

module.exports = router;
