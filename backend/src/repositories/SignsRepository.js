// File này giúp chúng ta truy xuất danh sách các biển báo giao thông cụ thể từ database
// Siêu đơn giản với các câu lệnh SQL cơ bản luôn!

const pool = require('../config/db');
const Signs = require('../models/Signs');

// Lớp SignsRepository quản lý và thao tác dữ liệu biển báo từ bảng signs
class SignsRepository {
    // Hàm này giúp lấy ra toàn bộ danh sách biển báo giao thông hiện có
    async findAll() {
        // Thực hiện SELECT toàn bộ dữ liệu từ bảng signs
        const [rows] = await pool.query('SELECT * FROM `signs`');
        return rows;
    }

    // Hàm này giúp tìm một biển báo cụ thể dựa trên ID của nó
    async findById(id) {
        // Tìm biển báo có id trùng khớp
        const [rows] = await pool.query('SELECT * FROM `signs` WHERE id = ?', [id]);
        // Nếu tìm thấy thì trả về biển báo đầu tiên, không thì trả về null
        return rows[0] || null;
    }
}
module.exports = new SignsRepository();
