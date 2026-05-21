require('dotenv').config();
const pool = require('../src/config/db');

async function verifyAll() {
  try {
    console.log('\n╔════════════════════════════════════════════════════╗');
    console.log('║      VERIFY ALL IMAGE URLS IN DATABASE             ║');
    console.log('╚════════════════════════════════════════════════════╝\n');
    
    // Laws
    const [laws] = await pool.query('SELECT COUNT(*) as count FROM laws WHERE image_url LIKE "/images/%"');
    const [lawsTotal] = await pool.query('SELECT COUNT(*) as count FROM laws WHERE image_url IS NOT NULL');
    console.log(`✓ Laws: ${laws[0].count}/${lawsTotal[0].count} correct`);
    
    // A1 Questions
    const [a1] = await pool.query('SELECT COUNT(*) as count FROM a1_250_questions WHERE image_url LIKE "/images/%"');
    const [a1Total] = await pool.query('SELECT COUNT(*) as count FROM a1_250_questions WHERE image_url IS NOT NULL');
    console.log(`✓ A1 Questions: ${a1[0].count}/${a1Total[0].count} correct`);
    
    // B2 Questions
    const [b2] = await pool.query('SELECT COUNT(*) as count FROM b2_600_questions WHERE image_url LIKE "/images/%"');
    const [b2Total] = await pool.query('SELECT COUNT(*) as count FROM b2_600_questions WHERE image_url IS NOT NULL');
    console.log(`✓ B2 Questions: ${b2[0].count}/${b2Total[0].count} correct`);
    
    // Signs
    const [signs] = await pool.query('SELECT COUNT(*) as count FROM signs WHERE image_url LIKE "/images/%"');
    const [signsTotal] = await pool.query('SELECT COUNT(*) as count FROM signs WHERE image_url IS NOT NULL');
    console.log(`✓ Signs: ${signs[0].count}/${signsTotal[0].count} correct`);
    
    // Sample URLs
    console.log('\n═══════════════════════════════════════════════════');
    const [lawSample] = await pool.query('SELECT image_url FROM laws LIMIT 1');
    console.log(`Sample Law URL: ${lawSample[0].image_url}`);
    
    const [a1Sample] = await pool.query('SELECT image_url FROM a1_250_questions WHERE image_url IS NOT NULL LIMIT 1');
    if (a1Sample.length > 0) {
      console.log(`Sample A1 URL: ${a1Sample[0].image_url}`);
    }
    
    const [b2Sample] = await pool.query('SELECT image_url FROM b2_600_questions WHERE image_url IS NOT NULL LIMIT 1');
    if (b2Sample.length > 0) {
      console.log(`Sample B2 URL: ${b2Sample[0].image_url}`);
    }
    
    const [signSample] = await pool.query('SELECT image_url FROM signs LIMIT 1');
    console.log(`Sample Sign URL: ${signSample[0].image_url}`);
    
    console.log('═══════════════════════════════════════════════════\n');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

verifyAll();
