/**
 * @file TestResultsRepository.js
 * @description Repository thực thi các truy vấn SQL trực tiếp liên quan đến TestResults.
 * @module Backend
 */

const pool = require('../config/db');
const TestResults = require('../models/TestResults');

/**
 * Lớp TestResultsRepository
 * Repository thực thi các truy vấn SQL trực tiếp liên quan đến TestResults.
 */
class TestResultsRepository {
    async findByUserId(userId) {
        const [rows] = await pool.query('SELECT * FROM `test_results` WHERE user_id = ? ORDER BY id DESC', [userId]);
        return rows;
    }

        /**
     * Thêm mới dữ liệu một dòng vào bảng CSDL tương ứng
     * @param {Object} data - Dữ liệu cần lưu
     * @returns {Promise<number>} ID của bản ghi vừa lưu (insertId)
     */
    async save(data) {
        const [result] = await pool.query('INSERT INTO `test_results` SET ?', [data]);
        return result.insertId;
    }
}
module.exports = new TestResultsRepository();
