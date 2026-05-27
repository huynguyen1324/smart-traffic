/**
 * @file LawsRepository.js
 * @description Repository thực thi các truy vấn SQL trực tiếp liên quan đến Laws.
 * @module Backend
 */

const pool = require('../config/db');
const Laws = require('../models/Laws');

/**
 * Lớp LawsRepository
 * Repository thực thi các truy vấn SQL trực tiếp liên quan đến Laws.
 */
class LawsRepository {
        /**
     * Truy vấn lấy tất cả các dòng từ bảng CSDL tương ứng
     * @returns {Promise<Array>} Danh sách thô từ CSDL
     */
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `laws`');
        return rows;
    }

        /**
     * Truy vấn dòng cụ thể trong CSDL dựa trên khóa chính ID
     * @param {number|string} id - Khóa chính
     * @returns {Promise<Object|null>} Bản ghi thô từ CSDL hoặc null
     */
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `laws` WHERE id = ?', [id]);
        return rows[0] || null;
    }
    async findByCategory(categoryId) {
        const [rows] = await pool.query('SELECT * FROM `laws` WHERE category_id = ?', [categoryId]);
        return rows;
    }
}
module.exports = new LawsRepository();
