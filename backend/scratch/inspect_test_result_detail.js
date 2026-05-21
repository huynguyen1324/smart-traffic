const pool = require('../src/config/db');

async function inspect() {
    try {
        console.log('--- TEST RESULT DETAIL COLUMNS ---');
        const [cols] = await pool.query('DESCRIBE `test_result_detail`');
        console.log(cols);
        
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting test_result_detail:', err);
        process.exit(1);
    }
}

inspect();
