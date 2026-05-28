// File này dùng để quản lý các danh mục luật giao thông (ví dụ: luật cho xe máy, ô tô...)
// Chúng ta sẽ dùng các câu lệnh SQL cơ bản để thêm, đọc, cập nhật, xoá danh mục nhé!

const pool = require('../config/db');
const LawCategories = require('../models/LawCategories');

// Lớp LawCategoriesRepository giúp thao tác với bảng danh mục luật giao thông
class LawCategoriesRepository {
    // Hàm này giúp lấy ra tất cả danh mục luật đang có trong database
    async findAll() {
        // Thực hiện SELECT tất cả bản ghi từ bảng law_categories
        const [rows] = await pool.query('SELECT * FROM `law_categories`');
        return rows;
    }

    // Hàm này tìm kiếm một danh mục luật cụ thể qua ID của nó
    async findById(id) {
        // SELECT danh mục có id trùng khớp với tham số truyền vào
        const [rows] = await pool.query('SELECT * FROM `law_categories` WHERE id = ?', [id]);
        // Nếu tìm thấy thì trả về danh mục đầu tiên, không thấy thì trả về null
        return rows[0] || null;
    }

    // Hàm này giúp thêm mới một danh mục luật vào database
    async save(data) {
        // Thực hiện INSERT dữ liệu mới vào bảng law_categories
        const [result] = await pool.query('INSERT INTO `law_categories` SET ?', [data]);
        // Trả về ID tự động tăng (insertId) của bản ghi vừa thêm
        return result.insertId;
    }

    // Hàm này giúp cập nhật thông tin của một danh mục luật dựa vào ID
    async update(id, data) {
        // Thực hiện UPDATE dữ liệu cho danh mục có id tương ứng
        const [result] = await pool.query('UPDATE `law_categories` SET ? WHERE id = ?', [data, id]);
        // Nếu số dòng bị ảnh hưởng lớn hơn 0 thì coi như đã cập nhật thành công (trả về true)
        return result.affectedRows > 0;
    }

    // Hàm này dùng để xoá một danh mục luật khỏi database
    async delete(id) {
        // Thực hiện DELETE danh mục luật theo id truyền vào
        const [result] = await pool.query('DELETE FROM `law_categories` WHERE id = ?', [id]);
        // Trả về true nếu xoá thành công, false nếu không xoá được gì
        return result.affectedRows > 0;
    }
}
module.exports = new LawCategoriesRepository();
