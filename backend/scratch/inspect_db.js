const pool = require('../src/config/db');

async function inspect() {
    try {
        const [columns] = await pool.query('DESCRIBE `users`');
        console.log('--- USERS TABLE COLUMNS ---');
        console.log(columns);
        
        const [rows] = await pool.query('SELECT * FROM `users` LIMIT 3');
        console.log('--- SAMPLE ROWS ---');
        console.log(rows);
        
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting database:', err);
        process.exit(1);
    }
}

inspect();
