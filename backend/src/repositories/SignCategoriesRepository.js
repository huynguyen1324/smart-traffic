// File này giúp chúng ta quản lý các loại biển báo giao thông (ví dụ: nhóm biển báo cấm, biển báo nguy hiểm...)
// Các phương thức ở đây dùng SQL để tương tác trực tiếp với cơ sở dữ liệu nha!

const pool = require('../config/db');
const SignCategories = require('../models/SignCategories');

// Lớp SignCategoriesRepository hỗ trợ thao tác dữ liệu với bảng sign_categories
class SignCategoriesRepository {
    // Hàm này giúp lấy ra tất cả danh mục biển báo hiện có trong database
    async findAll() {
        // Thực hiện SELECT tất cả bản ghi từ bảng sign_categories
        const [rows] = await pool.query('SELECT * FROM `sign_categories`');
        return rows;
    }

    // Hàm này giúp tìm một danh mục biển báo cụ thể dựa vào ID
    async findById(id) {
        // Tìm danh mục có id khớp với id được truyền vào
        const [rows] = await pool.query('SELECT * FROM `sign_categories` WHERE id = ?', [id]);
        // Nếu tìm thấy thì trả về danh mục đầu tiên, không thì trả về null cho an tâm
        return rows[0] || null;
    }

    // Hàm này dùng để lưu/thêm mới một danh mục biển báo vào database
    async save(data) {
        // Thực hiện câu lệnh INSERT dữ liệu mới vào bảng sign_categories
        const [result] = await pool.query('INSERT INTO `sign_categories` SET ?', [data]);
        // Trả về ID tự sinh của danh mục vừa tạo
        return result.insertId;
    }

    // Hàm này giúp sửa đổi thông tin của một danh mục biển báo đã có
    async update(id, data) {
        // Thực hiện UPDATE dữ liệu cho danh mục có id cụ thể
        const [result] = await pool.query('UPDATE `sign_categories` SET ? WHERE id = ?', [data, id]);
        // Trả về true nếu cập nhật thành công (có dòng dữ liệu thay đổi)
        return result.affectedRows > 0;
    }

    // Hàm này giúp xoá một danh mục biển báo ra khỏi hệ thống
    async delete(id) {
        // Thực hiện DELETE danh mục biển báo theo ID
        const [result] = await pool.query('DELETE FROM `sign_categories` WHERE id = ?', [id]);
        // Trả về true nếu xoá thành công, false nếu không xoá được dòng nào
        return result.affectedRows > 0;
    }
}
module.exports = new SignCategoriesRepository();
