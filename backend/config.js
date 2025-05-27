require("dotenv").config();

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

module.exports = {
  port: PORT || 3000,
  db: {
    host: DB_HOST || "",
    user: DB_USER || "",
    password: DB_PASSWORD || "",
    database: DB_NAME || "",
    port: DB_PORT || 3306,
  },
};
