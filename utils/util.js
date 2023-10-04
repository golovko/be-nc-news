const db = require('../db/connection');
const format = require('pg-format');

exports.checkExists = async (table, column, value) => {
  const queryStr = format('SELECT * FROM %I WHERE %I = $1;', table, column);
  const dbOutput = await db.query(queryStr, [value]);
  if (dbOutput.rows.length === 0) {
    return Promise.reject({ errorCode: 404, errorMessage: `Element with id ${value} not found` });
  } else {
    return true;
  }
};