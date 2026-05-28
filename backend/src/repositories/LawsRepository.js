// File này giúp chúng ta truy vấn thông tin các điều luật cụ thể từ cơ sở dữ liệu
// Các hàm ở đây sẽ giúp lấy toàn bộ danh sách luật hoặc tìm kiếm theo danh mục cụ thể nhé!

const pool = require('../config/db');
const Laws = require('../models/Laws');

// Lớp LawsRepository quản lý và truy xuất dữ liệu từ bảng laws
class LawsRepository {
    // Hàm này giúp lấy ra tất cả danh sách các điều luật hiện có trong hệ thống
    async findAll() {
        // Thực hiện SELECT toàn bộ từ bảng laws
        const [rows] = await pool.query('SELECT * FROM `laws`');
        return rows;
    }

    // Hàm này giúp tìm một điều luật cụ thể thông qua ID của điều luật đó
    async findById(id) {
        // SELECT điều luật có id trùng khớp
        const [rows] = await pool.query('SELECT * FROM `laws` WHERE id = ?', [id]);
        // Nếu tìm thấy thì trả về phần tử đầu tiên, ngược lại trả về null để tránh lỗi crash app
        return rows[0] || null;
    }

    // Hàm này giúp lọc ra danh sách các điều luật dựa trên danh mục (ví dụ: các luật dành riêng cho xe máy)
    async findByCategory(categoryId) {
        // Thực hiện SELECT các dòng trong bảng laws có category_id trùng với ID danh mục được truyền vào
        const [rows] = await pool.query('SELECT * FROM `laws` WHERE category_id = ?', [categoryId]);
        return rows;
    }
}
module.exports = new LawsRepository();
