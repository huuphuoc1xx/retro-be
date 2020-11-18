const models = require("../models/card.model");
const boardModel = require("../models/board.model");
const router = require("express").Router();
const utils = require("../utils/utils");

const checkPermission = async (boardId, res, userId) => {
  const board = await boardModel.single(boardId);
  if (!board) {
    utils.response(res, 1, "Board not exist");
    return false;
  }

  if (board.owner != userId && !board.public) {
    utils.response(res, 4, "Permission denied");
    return false;
  }
  return board;
};

router.get("/:boardId", async (req, res) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const board=await checkPermission(boardId, res, userId);
  if (!board) return;
  const info = await models.get(boardId);
  res.json({
    code: 0,
    data: { cards: info ,board},
  });
});

router.post("/:boardId", async (req, res) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const board=await checkPermission(boardId, res, userId);
  if (!board) return;
  const { content, type } = req.body;
  if (content && type)
    models
      .add(content, type, boardId)
      .then((response) => {
        res.json({
          code: 0,
          data: {
            id: response.insertId,
            content,
            type,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        utils.response(res, 1, err.message);
      });
  else {
    utils.response(res, 2, "card name could not be empty");
  }
});

router.put("/:boardId", async (req, res) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  const board=await checkPermission(boardId, res, userId);
  if (!board) return;
  const { id, content, type } = req.body;
  if (id && content && type)
    models
      .edit(id, content, type, boardId)
      .then((response) => {
        if (response.affectedRows)
          res.json({
            code: 0,
            data: {
              id,
              content,
              type,
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

router.delete("/:boardId", async (req, res) => {
  const userId = req.session.userId;
  const boardId = req.params.boardId;
  if (!await checkPermission(boardId, res, userId)) return;
  const { id } = req.body;
  if (id)
    models
      .delete(id, boardId)
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

