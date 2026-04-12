const pool = require('../src/config/db');

async function checkCols() {
  try {
    const [rows] = await pool.query('DESCRIBE `users`');
    console.log(JSON.stringify(rows, null, 2));
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

checkCols();
