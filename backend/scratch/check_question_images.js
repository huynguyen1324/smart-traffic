require('dotenv').config();
const pool = require('../src/config/db');

async function checkQuestionImages() {
  try {
    // Check questions tables
    const [q1] = await pool.query('SELECT id, image_url FROM a1_250_questions WHERE image_url IS NOT NULL LIMIT 3');
    console.log('\n=== A1_250_QUESTIONS IMAGE URLs ===');
    if (q1.length > 0) {
      console.table(q1);
    } else {
      console.log('No images found');
    }
    
    const [q2] = await pool.query('SELECT id, image_url FROM b2_600_questions WHERE image_url IS NOT NULL LIMIT 3');
    console.log('\n=== B2_600_QUESTIONS IMAGE URLs ===');
    if (q2.length > 0) {
      console.table(q2);
    } else {
      console.log('No images found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkQuestionImages();
