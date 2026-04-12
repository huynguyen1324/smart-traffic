const pool = require('../config/db');

class QuizRepository {
    getQuestionTable(license) {
        const l = (license || "").toLowerCase();
        if (l === "a1") return "a1_250_questions";
        if (l === "b2") return "b2_600_questions";
        throw new Error("Invalid license type: " + license);
    }

    async findTestList(license) {
        const table = (license || "").toLowerCase() === "a1" ? "a1_tests" : "b2_tests";
        const [rows] = await pool.query(`SELECT * FROM ${table} ORDER BY id ASC`);
        return rows;
    }

    async findQuestionsByTest(license, test_id) {
        const table = this.getQuestionTable(license);
        const [rows] = await pool.query(`
            SELECT id, type, type_category_id, test_id, image_url, description_text, 
                   option_a, option_b, option_c, option_d, correct_option, explanation
            FROM ${table} WHERE test_id = ? ORDER BY id ASC
        `, [test_id]);
        return rows;
    }

    async findQuestionsByType(license, type) {
        const table = this.getQuestionTable(license);
        const [rows] = await pool.query(`
            SELECT * FROM ${table} WHERE type = ? ORDER BY id ASC
        `, [type]);
        return rows;
    }

    async findQuestionsByTypeAndCategory(license, type, categoryId) {
        const table = this.getQuestionTable(license);
        const [rows] = await pool.query(`
            SELECT * FROM ${table} WHERE type = ? AND type_category_id = ? ORDER BY id ASC
        `, [type, categoryId]);
        return rows;
    }

    async saveResultDetail(data) {
        const { user_id, license, question_id, chosen_option, correct } = data;
        const [result] = await pool.query(`
            INSERT INTO quiz_results_detail (user_id, license, question_id, chosen_option, correct)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE chosen_option = VALUES(chosen_option), correct = VALUES(correct)
        `, [user_id, license, question_id, chosen_option, correct]);
        return result;
    }

    async findStats(userId, license) {
        const [rows] = await pool.query(`
            SELECT COUNT(question_id) as total_done,
                   SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as total_correct
            FROM quiz_results_detail
            WHERE user_id = ? AND license = ?
        `, [userId, license]);
        return rows[0];
    }

    async findDetails(userId, license) {
        const [rows] = await pool.query(`
            SELECT question_id, CAST(correct AS UNSIGNED) as correct
            FROM quiz_results_detail
            WHERE user_id = ? AND license = ?
        `, [userId, license]);
        return rows;
    }
}

module.exports = new QuizRepository();
