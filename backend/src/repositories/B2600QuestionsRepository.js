/**
 * @file B2600QuestionsRepository.js
 * @description Repository thực thi các truy vấn SQL trực tiếp liên quan đến B2600Questions.
 * @module Backend
 */

const pool = require('../config/db');
const B2600Questions = require('../models/B2600Questions');

/**
 * Lớp B2600QuestionsRepository
 * Repository thực thi các truy vấn SQL trực tiếp liên quan đến B2600Questions.
 */
class B2600QuestionsRepository {
        /**
     * Truy vấn lấy tất cả các dòng từ bảng CSDL tương ứng
     * @returns {Promise<Array>} Danh sách thô từ CSDL
     */
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `b2_600_questions`');
        return rows;
    }

        /**
     * Truy vấn dòng cụ thể trong CSDL dựa trên khóa chính ID
     * @param {number|string} id - Khóa chính
     * @returns {Promise<Object|null>} Bản ghi thô từ CSDL hoặc null
     */
    async findById(id) {
        const [rows] = await pool.query('SELECT * FROM `b2_600_questions` WHERE id = ?', [id]);
        return rows[0] || null;
    }

        /**
     * Thêm mới dữ liệu một dòng vào bảng CSDL tương ứng
     * @param {Object} data - Dữ liệu cần lưu
     * @returns {Promise<number>} ID của bản ghi vừa lưu (insertId)
     */
    async save(data) {
        const [result] = await pool.query('INSERT INTO `b2_600_questions` SET ?', [data]);
        return result.insertId;
    }

        /**
     * Cập nhật thông tin thực thể dữ liệu theo ID
     * @param {number|string} id - Mã định danh
     * @param {Object} data - Dữ liệu cần cập nhật
     * @returns {Promise<boolean>} Trạng thái thành công
     */
        /**
     * Cập nhật dữ liệu dòng trong CSDL dựa theo ID
     * @param {number|string} id - Khóa chính
     * @param {Object} data - Cập nhật tương ứng
     * @returns {Promise<boolean>} Có dòng nào được cập nhật thành công hay không
     */
    async update(id, data) {
        const [result] = await pool.query('UPDATE `b2_600_questions` SET ? WHERE id = ?', [data, id]);
        return result.affectedRows > 0;
    }

        /**
     * Xóa thực thể dữ liệu theo ID
     * @param {number|string} id - Mã định danh của phần tử cần xóa
     * @returns {Promise<boolean>} Trạng thái xóa thành công
     */
        /**
     * Thực hiện xóa dòng khỏi bảng CSDL dựa vào khóa chính ID
     * @param {number|string} id - Khóa chính
     * @returns {Promise<boolean>} Trạng thái xóa thành công
     */
    async delete(id) {
        const [result] = await pool.query('DELETE FROM `b2_600_questions` WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}
module.exports = new B2600QuestionsRepository();
