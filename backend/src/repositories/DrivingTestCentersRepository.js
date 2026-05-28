// File này giúp chúng ta lấy danh sách các trung tâm sát hạch lái xe từ database
// Siêu đơn giản và ngắn gọn nhé!

const pool = require('../config/db');

// Lớp DrivingTestCentersRepository quản lý các thông tin liên quan đến trung tâm thi lái xe
class DrivingTestCentersRepository {
    // Hàm này giúp lấy ra tất cả danh sách các trung tâm thi lái xe hiện có
    async findAll() {
        // SELECT toàn bộ dữ liệu từ bảng driving_test_centers
        const [rows] = await pool.query('SELECT * FROM `driving_test_centers`');
        return rows;
    }
}
module.exports = new DrivingTestCentersRepository();
