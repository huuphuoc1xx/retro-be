const db = require("../utils/db");

module.exports = {
  single: (username) =>
    db.load(
      `SELECT user_id,username,password
        FROM user 
        WHERE username=?`,
      [username]
    ),
add:(username,password)=>db.add("user",{username,password})
};
