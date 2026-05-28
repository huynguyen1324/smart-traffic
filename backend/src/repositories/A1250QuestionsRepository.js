// File này dùng để tương tác trực tiếp với cơ sở dữ liệu của bảng câu hỏi A1 (bộ 250 câu)
// Chúng ta sẽ dùng các câu lệnh SQL quen thuộc để lấy, thêm, sửa, xoá dữ liệu nhé!

const pool = require('../config/db');
const A1250Questions = require('../models/A1250Questions');

// Lớp A1250QuestionsRepository giúp quản lý các câu hỏi thi lái xe A1 bộ 250 câu
class A1250QuestionsRepository {
    // Hàm này giúp lấy ra toàn bộ danh sách câu hỏi A1 từ database
    async findAll() {
        // Thực hiện câu lệnh SELECT để lấy hết các câu hỏi trong bảng a1_250_questions
        const [rows] = await pool.query('SELECT * FROM `a1_250_questions`');
        return rows;
    }

    // Hàm này giúp tìm kiếm một câu hỏi cụ thể dựa theo ID truyền vào
    async findById(id) {
        // Tìm câu hỏi có id khớp với id được truyền vào
        const [rows] = await pool.query('SELECT * FROM `a1_250_questions` WHERE id = ?', [id]);
        // Nếu tìm thấy thì trả về câu hỏi đầu tiên, không thì trả về null cho đỡ lỗi
        return rows[0] || null;
    }

    // Hàm này dùng để thêm mới một câu hỏi A1 vào database
    async save(data) {
        // Thực hiện câu lệnh INSERT dữ liệu mới vào bảng a1_250_questions
        const [result] = await pool.query('INSERT INTO `a1_250_questions` SET ?', [data]);
        // Trả về ID của bản ghi vừa mới được tạo ra
        return result.insertId;
    }

    // Hàm này dùng để cập nhật thông tin của một câu hỏi đã có sẵn thông qua ID
    async update(id, data) {
        // Dùng lệnh UPDATE để sửa dữ liệu của câu hỏi có id tương ứng
        const [result] = await pool.query('UPDATE `a1_250_questions` SET ? WHERE id = ?', [data, id]);
        // Trả về true nếu có ít nhất một dòng trong database bị ảnh hưởng (sửa thành công)
        return result.affectedRows > 0;
    }

    // Hàm này dùng để xoá một câu hỏi khỏi database dựa vào ID
    async delete(id) {
        // Dùng lệnh DELETE để xoá câu hỏi có id tương ứng
        const [result] = await pool.query('DELETE FROM `a1_250_questions` WHERE id = ?', [id]);
        // Trả về true nếu xoá thành công (có dòng bị ảnh hưởng), ngược lại trả về false
        return result.affectedRows > 0;
    }
}
module.exports = new A1250QuestionsRepository();
