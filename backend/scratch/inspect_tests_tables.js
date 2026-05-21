const pool = require('../src/config/db');

async function inspect() {
    try {
        console.log('--- A1_250_QUESTIONS COLUMNS ---');
        const [a1Cols] = await pool.query('DESCRIBE `a1_250_questions`');
        console.log(a1Cols);
        
        console.log('--- B2_600_QUESTIONS COLUMNS ---');
        const [b2Cols] = await pool.query('DESCRIBE `b2_600_questions`');
        console.log(b2Cols);
        
        process.exit(0);
    } catch (err) {
        console.error('Error describing tables:', err);
        process.exit(1);
    }
}

inspect();
