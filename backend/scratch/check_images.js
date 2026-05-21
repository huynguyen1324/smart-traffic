require('dotenv').config();
const pool = require('../src/config/db');

async function verifyUrls() {
  try {
    // Check laws images
    const [laws] = await pool.query('SELECT id, title, image_url FROM laws LIMIT 3');
    console.log('\n=== LAWS IMAGE URLs (AFTER FIX) ===');
    console.table(laws);
    
    // Check signs images
    const [signs] = await pool.query('SELECT id, title, image_url FROM signs LIMIT 3');
    console.log('\n=== SIGNS IMAGE URLs (AFTER FIX) ===');
    console.table(signs);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

verifyUrls();
