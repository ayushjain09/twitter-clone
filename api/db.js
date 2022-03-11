const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "1234",
  host: "localhost",
  database: "twitter",
  port: 5432,
});

module.exports = pool;
