/**
 * @file SignsRepository.js
 * @description Repository thực thi các truy vấn SQL trực tiếp liên quan đến Signs.
 * @module Backend
 */

const pool = require('../config/db');
const Signs = require('../models/Signs');

/**
 * Lớp SignsRepository
 * Repository thực thi các truy vấn SQL trực tiếp liên quan đến Signs.
 */
class SignsRepository {
        /**
     * Truy vấn lấy tất cả các dòng từ bảng CSDL tương ứng
     * @returns {Promise<Array>} Danh sách thô từ CSDL
     */
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `signs`');
        return rows;
    }

        /**
     * Truy vấn dòng cụ thể trong CSDL dựa trên khóa chính ID
     * @param {number|string} id - Khóa chính
     * @returns {Promise<Object|null>} Bản ghi thô từ CSDL hoặc null
     */
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `signs` WHERE id = ?', [id]);
        return rows[0] || null;
    }
}
module.exports = new SignsRepository();
