
const mysql = require('mysql2/promise');

async function getDbData(query) {
  // Skip database operations in CI environment
  if (process.env.CI === 'true') {
    console.warn('Database operations skipped in CI environment');
    return []; // Return empty array or mock data
  }
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'testingipay'
    });

    const [rows] = await connection.execute(query);
    await connection.end();
    return rows;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return []; // Return empty array on connection failure
  }
}

module.exports = { getDbData };