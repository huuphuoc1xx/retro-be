const db = require("../utils/db");

module.exports = {
  get: (userid) => db.load(`SELECT id,name FROM board WHERE owner=?`, [userid]),
  single: async (id) => {
    const res = await db.load(`SELECT * FROM board WHERE id=?`, [id])
    return res[0];
  },
  add: (name, userid) => db.add("board", { name, owner: userid }),
  edit: (id, name, userid) =>
    db.load(`UPDATE board SET name=? WHERE id=? AND owner=?`, [
      name,
      id,
      userid,
    ]),
  delete: (id, userid) =>
    db.load(`DELETE FROM board  WHERE id=? AND owner=?`, [id, userid]),
};
