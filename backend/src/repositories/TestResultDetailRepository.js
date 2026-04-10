const pool = require('../config/db');
const TestResultDetail = require('../models/TestResultDetail');

class TestResultDetailRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `test_result_detail`');
        return rows;
    }

    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `test_result_detail` WHERE id = ?', [id]);
        return rows[0] || null;
    }

    async save(data) {
        const [result] = await pool.query('INSERT INTO `test_result_detail` SET ?', [data]);
        return result.insertId;
    }

    async update(id, data) {
        const [result] = await pool.query('UPDATE `test_result_detail` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

    async delete(id) {
        const [result] = await pool.query('DELETE FROM `test_result_detail` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new TestResultDetailRepository();
