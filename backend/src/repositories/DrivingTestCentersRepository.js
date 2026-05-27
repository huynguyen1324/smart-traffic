/**
 * @file DrivingTestCentersRepository.js
 * @description Repository thực thi các truy vấn SQL trực tiếp liên quan đến DrivingTestCenters.
 * @module Backend
 */

const pool = require('../config/db');

/**
 * Lớp DrivingTestCentersRepository
 * Repository thực thi các truy vấn SQL trực tiếp liên quan đến DrivingTestCenters.
 */
class DrivingTestCentersRepository {
        /**
     * Truy vấn lấy tất cả các dòng từ bảng CSDL tương ứng
     * @returns {Promise<Array>} Danh sách thô từ CSDL
     */
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `driving_test_centers`');
        return rows;
    }
}
module.exports = new DrivingTestCentersRepository();
