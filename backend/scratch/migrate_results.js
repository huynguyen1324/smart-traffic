const pool = require('../src/config/db');
(async () => {
    try {
        // 0. Xóa dữ liệu cũ do bị trộn lẫn ID A1/B2
        await pool.query("TRUNCATE TABLE quiz_results_detail");

        // 2. Tạo unique index trên (user_id, license, question_id)
        await pool.query("ALTER TABLE quiz_results_detail ADD UNIQUE INDEX idx_user_license_question (user_id, license, question_id)");
        
        console.log('Database updated: added license column and unique index to quiz_results_detail');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err.message);
        process.exit(1);
    }
})();
