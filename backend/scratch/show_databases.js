const mysql = require('mysql2/promise');
require('dotenv').config();

async function showDbs() {
  try {
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    const [rows] = await conn.query('SHOW DATABASES');
    console.log(JSON.stringify(rows, null, 2));
    await conn.end();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

showDbs();
