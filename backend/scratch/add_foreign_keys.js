const pool = require('../src/config/db');

async function applyMigration() {
    try {
        console.log('--- STARTING FOREIGN KEY & TABLE MIGRATION ---');

        // 1. Create user_streaks table if it doesn't exist
        console.log('Creating user_streaks table (if not exists)...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS \`user_streaks\` (
                \`id\` INT NOT NULL AUTO_INCREMENT,
                \`user_id\` INT NULL,
                \`current_streak\` INT DEFAULT 0,
                \`longest_streak\` INT DEFAULT 0,
                \`last_activity_date\` DATE NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);
        console.log('✅ user_streaks table ready.');

        // 2. Clean up orphaned rows before applying foreign keys to prevent constraint violations
        console.log('Cleaning up orphaned rows...');

        await pool.query('DELETE FROM `chatbot_history` WHERE user_id NOT IN (SELECT id FROM users)');
        await pool.query('DELETE FROM `laws` WHERE category_id NOT IN (SELECT id FROM law_categories) AND category_id IS NOT NULL');
        await pool.query('DELETE FROM `quiz_results_detail` WHERE user_id NOT IN (SELECT id FROM users) AND user_id IS NOT NULL');
        await pool.query('DELETE FROM `signs` WHERE category_id NOT IN (SELECT id FROM sign_categories) AND category_id IS NOT NULL');
        await pool.query('DELETE FROM `test_result_detail` WHERE test_result_id NOT IN (SELECT id FROM test_results) AND test_result_id IS NOT NULL');
        await pool.query('DELETE FROM `test_results` WHERE user_id NOT IN (SELECT id FROM users) AND user_id IS NOT NULL');
        await pool.query('DELETE FROM `user_streaks` WHERE user_id NOT IN (SELECT id FROM users) AND user_id IS NOT NULL');
        
        console.log('✅ Orphaned rows cleaned up.');

        // 3. Add Foreign Key constraints
        console.log('Applying Foreign Key constraints...');

        // chatbot_history
        try {
            await pool.query(`
                ALTER TABLE \`chatbot_history\`
                ADD CONSTRAINT \`fk_chatbot_history_user\`
                FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
            `);
            console.log('✅ Foreign key fk_chatbot_history_user added.');
        } catch (e) {
            console.log('⚠️ fk_chatbot_history_user already exists or failed:', e.message);
        }

        // laws
        try {
            await pool.query(`
                ALTER TABLE \`laws\`
                ADD CONSTRAINT \`fk_laws_category\`
                FOREIGN KEY (\`category_id\`) REFERENCES \`law_categories\`(\`id\`) ON DELETE CASCADE
            `);
            console.log('✅ Foreign key fk_laws_category added.');
        } catch (e) {
            console.log('⚠️ fk_laws_category already exists or failed:', e.message);
        }

        // quiz_results_detail
        try {
            await pool.query(`
                ALTER TABLE \`quiz_results_detail\`
                ADD CONSTRAINT \`fk_quiz_results_user\`
                FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
            `);
            console.log('✅ Foreign key fk_quiz_results_user added.');
        } catch (e) {
            console.log('⚠️ fk_quiz_results_user already exists or failed:', e.message);
        }

        // signs
        try {
            await pool.query(`
                ALTER TABLE \`signs\`
                ADD CONSTRAINT \`fk_signs_category\`
                FOREIGN KEY (\`category_id\`) REFERENCES \`sign_categories\`(\`id\`) ON DELETE CASCADE
            `);
            console.log('✅ Foreign key fk_signs_category added.');
        } catch (e) {
            console.log('⚠️ fk_signs_category already exists or failed:', e.message);
        }

        // test_result_detail
        try {
            await pool.query(`
                ALTER TABLE \`test_result_detail\`
                ADD CONSTRAINT \`fk_test_result_detail_result\`
                FOREIGN KEY (\`test_result_id\`) REFERENCES \`test_results\`(\`id\`) ON DELETE CASCADE
            `);
            console.log('✅ Foreign key fk_test_result_detail_result added.');
        } catch (e) {
            console.log('⚠️ fk_test_result_detail_result already exists or failed:', e.message);
        }

        // test_results
        try {
            await pool.query(`
                ALTER TABLE \`test_results\`
                ADD CONSTRAINT \`fk_test_results_user\`
                FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
            `);
            console.log('✅ Foreign key fk_test_results_user added.');
        } catch (e) {
            console.log('⚠️ fk_test_results_user already exists or failed:', e.message);
        }

        // user_streaks
        try {
            await pool.query(`
                ALTER TABLE \`user_streaks\`
                ADD CONSTRAINT \`fk_user_streaks_user\`
                FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
            `);
            console.log('✅ Foreign key fk_user_streaks_user added.');
        } catch (e) {
            console.log('⚠️ fk_user_streaks_user already exists or failed:', e.message);
        }

        console.log('🎉 ALL MIGRATIONS AND CONSTRAINTS COMPLETED SUCCESSFULLY!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Migration failed:', err);
        process.exit(1);
    }
}

applyMigration();
