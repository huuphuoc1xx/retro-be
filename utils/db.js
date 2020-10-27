const mysql = require('mysql2');
const util = require('util');
const config = require('../config/config.json');


const pool = mysql.createPool(config.mysql);
const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
  load: mysql_query,
  add: (tableName, entity) => mysql_query(`INSERT INTO ${tableName} SET ? `, entity) ,
  del: (tableName, condition) => mysql_query(`DELETE FROM ${tableName} WHERE ?`, condition),
  edit: (tableName, entity, condition) => mysql_query(`UPDATE ${tableName} SET ? WHERE ?`, [entity, condition]),
};