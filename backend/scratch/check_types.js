const pool = require('../src/config/db');
(async () => {
    try {
        const [rows] = await pool.query("SHOW INDEX FROM quiz_results_detail");
        console.log('Indexes of quiz_results_detail:', rows);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
