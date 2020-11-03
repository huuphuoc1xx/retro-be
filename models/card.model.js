const db = require("../utils/db");

module.exports = {
  get: (board) =>
    db.load(
      `SELECT id ,content,type 
        FROM card 
        WHERE board=?`,
      [board]
    ),
  add: (content, type, board) => db.add("card", { content, type, board }),
  edit: (id, content, type, board) =>
    db.load(`UPDATE card SET ? WHERE id=? AND board=?`, [
      { content, type },
      id,
      board,
    ]),
  delete: (id, board) =>
    db.load(`DELETE FROM card  WHERE id=? AND board=?`, [id, board]),
};
