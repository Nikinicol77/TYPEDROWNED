const mysql = require('mysql2/promise');
const { config } = require('../config/app.config');

const pool = mysql.createPool({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testDatabaseConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    console.log(`Base de datos conectada: ${config.database.name}`);
  } finally {
    connection.release();
  }
}

module.exports = { pool, testDatabaseConnection };
