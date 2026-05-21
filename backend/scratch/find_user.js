const db = require('../src/config/db');

async function findUser() {
  try {
    const conn = await db.getConnection();
    
    // Kiểm tra structure của table users
    const [cols] = await conn.query('DESCRIBE users');
    console.log('Users table columns:');
    cols.forEach(c => console.log(`- ${c.Field} (${c.Type})`));
    
    console.log('\n---\n');
    
    // Tìm user với phone
    const [rows] = await conn.query('SELECT * FROM users WHERE phone = ? OR email = ?', ['0123456701', '0123456701']);
    console.log('User found:');
    console.log(JSON.stringify(rows, null, 2));
    
    conn.release();
    process.exit(0);
  } catch(e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

findUser();
