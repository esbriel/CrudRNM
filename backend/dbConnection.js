const mysql = require("mysql2/promise");
const { db } = require("./config");

const pool = mysql.createPool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.database,
  port: db.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error("Error al conectar la db:", error);
    throw error;
  }
}

Object.freeze(pool);

module.exports = {
  getConnection,
};
