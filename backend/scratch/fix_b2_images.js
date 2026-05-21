require('dotenv').config();
const pool = require('../src/config/db');

async function fixB2() {
  try {
    console.log('Fixing B2_600_QUESTIONS images...\n');
    
    const [b2] = await pool.query('SELECT id, image_url FROM b2_600_questions WHERE image_url IS NOT NULL');
    
    for (const q of b2) {
      const newUrl = q.image_url.replace('/public/images', '/images');
      if (newUrl !== q.image_url) {
        await pool.query('UPDATE b2_600_questions SET image_url = ? WHERE id = ?', [newUrl, q.id]);
        console.log(`✓ Q ${q.id}: ${q.image_url} → ${newUrl}`);
      }
    }
    
    console.log('\n✅ B2 Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixB2();
