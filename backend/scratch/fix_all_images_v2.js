require('dotenv').config();
const pool = require('../src/config/db');

async function fixAllImages() {
  try {
    console.log('Updating all image URLs...\n');
    
    // Fix laws
    const result1 = await pool.query(
      "UPDATE laws SET image_url = REPLACE(image_url, '/public/images', '/images') WHERE image_url LIKE '%/public/images%'"
    );
    console.log(`✓ Laws updated: ${result1[0].affectedRows} rows`);
    
    // Fix A1 questions
    const result2 = await pool.query(
      "UPDATE a1_250_questions SET image_url = REPLACE(image_url, '/public/images', '/images') WHERE image_url LIKE '%/public/images%'"
    );
    console.log(`✓ A1 Questions updated: ${result2[0].affectedRows} rows`);
    
    // Fix B2 questions
    const result3 = await pool.query(
      "UPDATE b2_600_questions SET image_url = REPLACE(image_url, '/public/images', '/images') WHERE image_url LIKE '%/public/images%'"
    );
    console.log(`✓ B2 Questions updated: ${result3[0].affectedRows} rows`);
    
    // Fix signs (from spring boot path)
    const result4 = await pool.query(
      "UPDATE signs SET image_url = CONCAT('/images/sign_images/', SUBSTRING_INDEX(image_url, '/', -1), '.png') WHERE image_url LIKE '%src/main/resources%'"
    );
    console.log(`✓ Signs updated: ${result4[0].affectedRows} rows`);
    
    console.log('\n✅ All updates completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixAllImages();
