const pool = require('../src/config/db');

async function inspect() {
    try {
        console.log('--- FOREIGN KEYS IN DATABASE ---');
        const [rows] = await pool.query(`
            SELECT 
                TABLE_NAME, 
                CONSTRAINT_NAME, 
                COLUMN_NAME, 
                REFERENCED_TABLE_NAME, 
                REFERENCED_COLUMN_NAME 
            FROM 
                INFORMATION_SCHEMA.KEY_COLUMN_USAGE 
            WHERE 
                TABLE_SCHEMA = 'traffic_app_db' 
                AND REFERENCED_TABLE_NAME IS NOT NULL
        `);
        console.log(rows);
        
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting foreign keys:', err);
        process.exit(1);
    }
}

inspect();
