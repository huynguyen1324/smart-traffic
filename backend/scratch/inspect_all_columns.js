const pool = require('../src/config/db');

async function inspect() {
    try {
        const [tables] = await pool.query('SHOW TABLES');
        const dbName = 'Tables_in_traffic_app_db';
        
        for (const row of tables) {
            const tableName = row[dbName];
            console.log(`\n=================== ${tableName.toUpperCase()} ===================`);
            const [columns] = await pool.query(`DESCRIBE \`${tableName}\``);
            console.log(columns);
        }
        
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting database:', err);
        process.exit(1);
    }
}

inspect();
