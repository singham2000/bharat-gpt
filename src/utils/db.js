const mysql = require("mysql2");
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "192.185.129.71",
  user: "triptigr_bharat_GPT",
  password: "BharatGPT@2006",
  database: "triptigr_bharat_GPT",
  waitForConnections: true,
  queueLimit: 50,
});
module.exports = pool.promise();
