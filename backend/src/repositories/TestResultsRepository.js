const pool = require('../config/db');
const TestResults = require('../models/TestResults');

class TestResultsRepository {
    async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM `test_results` WHERE user_id = ? ORDER BY id DESC', [userId]);
        return rows;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `test_results` SET ?', [data]);
        return result.insertId;
    }
}
module.exports = new TestResultsRepository();
