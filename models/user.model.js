const db = require("../utils/db");

module.exports = {
  single: (username) =>
    db.load(
      `SELECT user_id,username,password
        FROM user 
        WHERE username=?`,
      [username]
    ),
  loadInfo: (userId) =>
    db.load(
      `SELECT username,fullname as name,email,dob FROM user WHERE user_id=?`,
      [userId]
    ),
  add: (username, password) => db.add("user", { username, password }),
  edit: (userid, name, email, dob) =>
    db.edit("user", { fullname: name, email, dob }, { user_id: userid }),
};
