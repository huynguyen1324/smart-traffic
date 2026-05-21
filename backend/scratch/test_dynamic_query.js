const pool = require('../src/config/db');

async function inspect() {
    try {
        console.log('--- A1 DYNAMIC TESTS ---');
        const [a1Tests] = await pool.query(`
            SELECT test_number AS id, CONCAT('Đề số ', test_number) AS name, COUNT(*) AS total
            FROM \`a1_250_questions\`
            WHERE test_number IS NOT NULL AND test_number != 0
            GROUP BY test_number
            ORDER BY test_number ASC
        `);
        console.log(a1Tests);
        
        console.log('--- B2 DYNAMIC TESTS ---');
        const [b2Tests] = await pool.query(`
            SELECT test_number AS id, CONCAT('Đề số ', test_number) AS name, COUNT(*) AS total
            FROM \`b2_600_questions\`
            WHERE test_number IS NOT NULL AND test_number != 0
            GROUP BY test_number
            ORDER BY test_number ASC
        `);
        console.log(b2Tests);
        
        process.exit(0);
    } catch (err) {
        console.error('Error querying dynamic tests:', err);
        process.exit(1);
    }
}

inspect();
