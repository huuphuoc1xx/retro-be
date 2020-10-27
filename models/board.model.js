const db = require("../utils/db");

module.exports = {
  get: (userid) => db.load(`SELECT id,name FROM board WHERE owner=?`,[userid]),
  add:(name,userid)=>db.add("board",{name,owner:userid})
};
