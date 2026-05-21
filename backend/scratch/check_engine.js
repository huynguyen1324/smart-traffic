const pool = require('../src/config/db');

async function inspect() {
    try {
        console.log('--- TABLE STORAGE ENGINES ---');
        const [rows] = await pool.query(`
            SELECT table_name, engine 
            FROM information_schema.tables 
            WHERE table_schema = 'traffic_app_db'
        `);
        console.log(rows);
        
        process.exit(0);
    } catch (err) {
        console.error('Error inspecting table engines:', err);
        process.exit(1);
    }
}

inspect();
