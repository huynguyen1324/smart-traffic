const pool = require('../src/config/db');

async function updateSchema() {
    try {
        console.log('--- STARTING DATABASE SCHEMA UPDATE ---');
        
        // 1. Alter table test_results to add missing columns
        await pool.query(`
            ALTER TABLE \`test_results\`
            ADD COLUMN \`test_id\` INT NULL AFTER \`user_id\`,
            ADD COLUMN \`license\` VARCHAR(10) NULL AFTER \`test_id\`,
            ADD COLUMN \`total\` INT NULL AFTER \`license\`,
            ADD COLUMN \`correct\` INT NULL AFTER \`total\`,
            ADD COLUMN \`wrong\` INT NULL AFTER \`correct\`,
            ADD COLUMN \`unanswered\` INT NULL AFTER \`wrong\`
        `);
        console.log('✅ Alter table query executed successfully!');
        
        // 2. Describe table to verify columns
        const [columns] = await pool.query('DESCRIBE `test_results`');
        console.log('--- UPDATED TEST RESULTS TABLE COLUMNS ---');
        console.log(columns);
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Database schema update failed:', err);
        process.exit(1);
    }
}

updateSchema();
