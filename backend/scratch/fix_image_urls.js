require('dotenv').config();
const pool = require('../src/config/db');

async function fixImageUrls() {
  try {
    console.log('Starting image URL migration...\n');
    
    // Fix laws images
    console.log('=== Fixing LAWS images ===');
    const [laws] = await pool.query('SELECT id, image_url FROM laws WHERE image_url LIKE "%/public/images%"');
    
    for (const law of laws) {
      const newUrl = law.image_url.replace('/public/images', '/images');
      await pool.query('UPDATE laws SET image_url = ? WHERE id = ?', [newUrl, law.id]);
      console.log(`✓ Law ${law.id}: ${law.image_url} → ${newUrl}`);
    }
    
    // Fix signs images - need to add extension
    console.log('\n=== Fixing SIGNS images ===');
    const [signs] = await pool.query('SELECT id, image_url FROM signs WHERE image_url LIKE "%src/main/resources%"');
    
    for (const sign of signs) {
      // Extract filename and add .png extension if not present
      let filename = sign.image_url.split('/').pop();
      if (!filename.match(/\.(png|jpg|jpeg|webp|gif)$/i)) {
        filename += '.png';
      }
      const newUrl = `/images/sign_images/${filename}`;
      await pool.query('UPDATE signs SET image_url = ? WHERE id = ?', [newUrl, sign.id]);
      console.log(`✓ Sign ${sign.id}: ${sign.image_url} → ${newUrl}`);
    }
    
    // Fix A1 question images
    console.log('\n=== Fixing A1_250_QUESTIONS images ===');
    const [a1] = await pool.query('SELECT id, image_url FROM a1_250_questions WHERE image_url LIKE "%/public/images%"');
    
    for (const q of a1) {
      const newUrl = q.image_url.replace('/public/images', '/images');
      await pool.query('UPDATE a1_250_questions SET image_url = ? WHERE id = ?', [newUrl, q.id]);
      console.log(`✓ Q ${q.id}: ${q.image_url} → ${newUrl}`);
    }
    
    // Fix B2 question images
    console.log('\n=== Fixing B2_600_QUESTIONS images ===');
    const [b2] = await pool.query('SELECT id, image_url FROM b2_600_questions WHERE image_url LIKE "%/public/images%"');
    
    for (const q of b2) {
      const newUrl = q.image_url.replace('/public/images', '/images');
      await pool.query('UPDATE b2_600_questions SET image_url = ? WHERE id = ?', [newUrl, q.id]);
      console.log(`✓ Q ${q.id}: ${q.image_url} → ${newUrl}`);
    }
    
    console.log('\n✅ Migration completed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixImageUrls();
