require('dotenv').config();
const pool = require('../src/config/db');

async function checkLawImages() {
  try {
    const [laws] = await pool.query('SELECT id, title, image_url FROM laws LIMIT 15');
    console.log('\n=== CURRENT LAWS IMAGE URLs IN DB ===');
    console.table(laws);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkLawImages();
