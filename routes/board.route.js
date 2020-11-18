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
  const { name } = req.body;
  if (name)
    models
      .add(name, userId)
      .then((response) => {
        res.json({
          code: 0,
          data: {
            id: response.insertId,
            name: name,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        utils.response(res, 1, err.message);
      });
  else {
    utils.response(res, 2, "Board name could not be empty");
  }
});

router.put("/", async (req, res) => {
  const userId = req.session.userId;
  const { name, id } = req.body;
  if (name && id)
    models
      .edit(id, name, userId)
      .then((response) => {
        if (response.affectedRows)
          res.json({
            code: 0,
            data: {
              id,
              name,
            },
          });
        else throw "Something was wrong";
      })
      .catch((err) => {
        console.log(err);
        utils.response(res, 1, err.message);
      });
  else {
    utils.response(res, 2, "Invalid params");
  }
});

router.put("/public", async (req,res) => {
  const userId = req.session.userId;
  const { id } = req.body;
  if (id) {
    const board = await models.single(id);
    if (!board) {
      utils.response(res, 1, "Board not exist");
      return 1;
    }

    if (board.owner != userId) {
      utils.response(res, 4, "Permission denied");
      return 1;
    }

    models
      .updateStatus(id, !board.public)
      .then((response) => {
        if (response.affectedRows)
          res.json({
            code: 0,
            data: {
              id,
            },
          });
        else throw "Something was wrong";
      })
      .catch((err) => {
        console.log(err);
        utils.response(res, 1, err.message);
      });
  } else {
    utils.response(res, 2, "Invalid params");
  }
});

router.delete("/", async (req, res) => {
  const userId = req.session.userId;
  const { id } = req.body;
  if (id)
    models
      .delete(id, userId)
      .then((response) => {
        if (response.affectedRows)
          res.json({
            code: 0,
            data: {
              id,
            },
          });
        else throw "Something was wrong";
      })
      .catch((err) => {
        console.log(err);
        utils.response(res, 1, err.message);
      });
  else {
    utils.response(res, 2, "Invalid params");
  }
});

module.exports = router;
