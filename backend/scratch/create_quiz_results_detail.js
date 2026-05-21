const pool = require('../src/config/db');

async function createTable() {
    try {
        console.log('--- CREATING QUIZ RESULTS DETAIL TABLE ---');
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`quiz_results_detail\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`user_id\` INT NULL,
                \`license\` VARCHAR(10) NULL,
                \`question_id\` INT NULL,
                \`chosen_option\` CHAR(1) NULL,
                \`correct\` TINYINT(1) NULL,
                PRIMARY KEY (\`id\`),
                UNIQUE KEY \`idx_user_license_question\` (\`user_id\`, \`license\`, \`question_id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('✅ Created table quiz_results_detail successfully!');
        
        const [columns] = await pool.query('DESCRIBE `quiz_results_detail`');
        console.log('--- QUIZ RESULTS DETAIL TABLE COLUMNS ---');
        console.log(columns);
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Failed to create table quiz_results_detail:', err);
        process.exit(1);
    }
}

createTable();
