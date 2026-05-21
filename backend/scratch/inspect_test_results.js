const pool = require('../src/config/db');

async function inspect() {
    try {
        const [columns] = await pool.query('DESCRIBE `test_results`');
        console.log('--- TEST RESULTS TABLE COLUMNS ---');
        console.log(columns);
        
        const [rows] = await pool.query('SELECT * FROM `test_results` LIMIT 3');
        console.log('--- SAMPLE ROWS ---');
        console.log(rows);
        
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting database:', err);
        process.exit(1);
    }
}

inspect();
