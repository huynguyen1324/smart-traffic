const pool = require('../config/db');
const TestResults = require('../models/TestResults');

class TestResultsRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `test_results`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `test_results` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM `test_results` WHERE user_id = ?', [userId]);
        return rows;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `test_results` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `test_results` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `test_results` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new TestResultsRepository();
