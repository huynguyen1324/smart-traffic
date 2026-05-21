require('dotenv').config();
const pool = require('../src/config/db');

async function describeTable() {
  try {
    // Xem cấu trúc bảng
    const [columns] = await pool.query('DESCRIBE users');
    console.log('\n=== USERS TABLE STRUCTURE ===');
    console.table(columns);
    
    // Xem dữ liệu user
    const [rows] = await pool.query(
      'SELECT * FROM `users` WHERE phone = ? OR email = ?',
      ['0123456701', '0123456701']
    );
    
    if (rows.length > 0) {
      console.log('\n=== USER DATA ===');
      console.table(rows);
    } else {
      console.log('\nNo user found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

describeTable();
