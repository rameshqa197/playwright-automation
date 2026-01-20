const mysql = require('mysql2/promise');
async function getDbData(query) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testingipay'
  });

  const [rows] = await connection.execute(query);
  await connection.end();
  return rows;
}

module.exports = { getDbData };