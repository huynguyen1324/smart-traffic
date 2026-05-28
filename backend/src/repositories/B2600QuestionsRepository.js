// File này dùng để tương tác trực tiếp với cơ sở dữ liệu của bảng câu hỏi B2 (bộ 600 câu)
// Chúng ta sẽ dùng các câu lệnh SQL quen thuộc để lấy, thêm, sửa, xoá dữ liệu nhé!

const pool = require('../config/db');
const B2600Questions = require('../models/B2600Questions');

// Lớp B2600QuestionsRepository giúp quản lý các câu hỏi thi lái xe B2 bộ 600 câu
class B2600QuestionsRepository {
    // Hàm này giúp lấy ra toàn bộ danh sách câu hỏi B2 từ database
    async findAll() {
        // Thực hiện câu lệnh SELECT để lấy hết các câu hỏi trong bảng b2_600_questions
        const [rows] = await pool.query('SELECT * FROM `b2_600_questions`');
        return rows;
    }

    // Hàm này giúp tìm kiếm một câu hỏi B2 cụ thể dựa theo ID truyền vào
    async findById(id) {
        // Tìm câu hỏi có id khớp với id được truyền vào
        const [rows] = await pool.query('SELECT * FROM `b2_600_questions` WHERE id = ?', [id]);
        // Nếu tìm thấy thì trả về câu hỏi đầu tiên, không thì trả về null cho đỡ lỗi
        return rows[0] || null;
    }

    // Hàm này dùng để thêm mới một câu hỏi B2 vào database
    async save(data) {
        // Thực hiện câu lệnh INSERT dữ liệu mới vào bảng b2_600_questions
        const [result] = await pool.query('INSERT INTO `b2_600_questions` SET ?', [data]);
        // Trả về ID của bản ghi vừa mới được tạo ra
        return result.insertId;
    }

    // Hàm này dùng để cập nhật thông tin của một câu hỏi đã có sẵn thông qua ID
    async update(id, data) {
        // Dùng lệnh UPDATE để sửa dữ liệu của câu hỏi có id tương ứng
        const [result] = await pool.query('UPDATE `b2_600_questions` SET ? WHERE id = ?', [data, id]);
        // Trả về true nếu sửa thành công (có dòng trong database bị ảnh hưởng)
        return result.affectedRows > 0;
    }

    // Hàm này dùng để xoá một câu hỏi khỏi database dựa vào ID
    async delete(id) {
        // Dùng lệnh DELETE để xoá câu hỏi có id tương ứng
        const [result] = await pool.query('DELETE FROM `b2_600_questions` WHERE id = ?', [id]);
        // Trả về true nếu xoá thành công (có dòng bị ảnh hưởng), ngược lại trả về false
        return result.affectedRows > 0;
    }
}
module.exports = new B2600QuestionsRepository();
